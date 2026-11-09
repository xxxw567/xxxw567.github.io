local stringify = pandoc.utils.stringify

local function caption(block)
  return block and block.t == 'Para'
    and stringify(block):match('^图%s*%d+%.%s*%d+')
end

local function image_only(block)
  if block.t ~= 'Para' and block.t ~= 'Plain' then return false end
  local found = false
  for _, inline in ipairs(block.content) do
    if inline.t == 'Image' then
      found = true
    elseif inline.t ~= 'Space' and inline.t ~= 'SoftBreak'
      and not (inline.t == 'Span' and #inline.content == 0) then
      return false
    end
  end
  return found
end

local function note(block)
  if block.t ~= 'Para' then return false end
  local text = stringify(block)
  for _, prefix in ipairs({'注：', '注:', '图源见脚注'}) do
    if text:sub(1, #prefix) == prefix then return true end
  end
  return false
end

local function format_blocks(blocks)
  local out = pandoc.List()
  local i = 1
  while i <= #blocks do
    local block = blocks[i]
    local following = blocks[i + 1]
    if caption(following) and (block.t == 'Figure' or image_only(block)) then
      -- Use the full numbered caption below the image, not its shorter alt text.
      local full_caption = pandoc.Caption({following})
      if block.t == 'Figure' then
        block.caption = full_caption
      else
        block = pandoc.Figure({block}, full_caption)
      end
      block = block:walk({
        Image = function (image)
          if #image.caption == 0 then image.caption = following.content end
          return image
        end
      })
      i = i + 1
    elseif note(block) then
      block = pandoc.Div({block}, pandoc.Attr('', {'book-note'}))
    end
    out:insert(block)
    i = i + 1
  end
  return out
end

return {
  {Blocks = format_blocks},
  {Image = function (image)
    image.attributes.loading = 'lazy'
    image.attributes.decoding = 'async'
    return image
  end}
}
