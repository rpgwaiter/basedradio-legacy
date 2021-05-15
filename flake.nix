{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
  };

  outputs = { self, nixpkgs }: let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
    callPackage = pkgs.callPackage;
  
  in {
    packages.x86_64-linux.basedradio = pkgs.yarn2nix-moretea.mkYarnPackage {
      name = "basedradio";
      src = ./.;
      packageJSON = ./package.json;
      yarnLock = ./yarn.lock;
      yarnNix = ./yarn.nix;
    };

    devShell.x86_64-linux =
        pkgs.mkShell { buildInputs = [ 
          #self.packages.x86_64-linux.basedradio 
          pkgs.yarn 
        ]; };
  };
}
