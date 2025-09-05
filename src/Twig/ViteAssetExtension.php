<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ViteAssetExtension extends AbstractExtension
{
    private string $manifestPath;
    private ?array $manifest = null;

    public function __construct(string $projectDir)
    {
        $this->manifestPath = $projectDir . '/public/build/.vite/manifest.json';
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('vite_asset', [$this, 'getViteAsset']),
        ];
    }

    public function getViteAsset(string $assetPath): string
    {
        if ($this->manifest === null) {
            $this->loadManifest();
        }

        $key = 'assets/' . ltrim($assetPath, '/');

        if (isset($this->manifest[$key]['file'])) {
            return '/build/' . $this->manifest[$key]['file'];
        }

        // Fallback si l'asset n'est pas dans le manifest
        return '/build/assets/' . basename($assetPath);
    }

    private function loadManifest(): void
    {
        if (file_exists($this->manifestPath)) {
            $content = file_get_contents($this->manifestPath);
            $this->manifest = json_decode($content, true) ?? [];
        } else {
            $this->manifest = [];
        }
    }
}
