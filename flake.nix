{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;

  in {
    packages.x86_64-linux.basedradio = pkgs.yarn2nix.mkYarnPackage {
      name = "basedcradio";
      src = ./.;
      packageJSON = ./package.json;
      yarnLock = ./yarn.lock;
      yarnNix = ./yarn.nix;
    };

    devShell.x86_64-linux = with pkgs;
      mkShell { 
        buildInputs = [ 
          #self.packages.x86_64-linux.basedradio 
          yarn
          yarn2nix
          nodePackages.node2nix
          nodePackages.webpack-cli
          nodePackages.webpack
          nodePackages.npm
          nodePackages.npm-check-updates
        ]; 
      };
  };
}
