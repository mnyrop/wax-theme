# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'wax-theme'
  spec.version       = '1.1.0'
  spec.authors       = ['mnyrop']
  spec.email         = ['marii@nyu.edu']
  spec.summary       = 'Jekyll gem theme for Minicomp/Wax'
  spec.homepage      = 'https://github.com/minicomp/wax-theme'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency 'jekyll', '~> 4.3.2'
  spec.add_runtime_dependency 'webrick', '~> 1.8'

  spec.add_development_dependency 'html-proofer', '~> 3.15'
end
