$ErrorActionPreference = 'Stop'
$bookDirectory = Join-Path $PSScriptRoot '../files/legal-statistics'
$bookTemplate = Join-Path $PSScriptRoot 'legal-statistics.html'
$pandocOptions = @(
    '--from=markdown', '--to=html5', '--standalone',
    '--metadata=title:司法统计学', '--metadata=lang:zh-CN',
    "--template=$bookTemplate", '--css=book.css',
    '--toc', '--toc-depth=1',
    '--mathjax=https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    '--output=index.html'
)
Push-Location -LiteralPath $bookDirectory
try {
    pandoc legal-statistics.md @pandocOptions
    if ($LASTEXITCODE -ne 0) {
        throw "Pandoc failed with exit code $LASTEXITCODE."
    }
} finally {
    Pop-Location
}
