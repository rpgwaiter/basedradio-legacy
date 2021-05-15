{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
  };

  outputs = { self, nixpkgs }: let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
  in {
    packages.x86_64-linux.basedradio = (pkgs.callPackage ./default.nix {});

    devShell.x86_64-linux = with pkgs;
        mkShell { 
          buildInputs = [ 
            #self.packages.x86_64-linux.basedradio 
            yarn
            yarn2nix
            nodePackages.node2nix
          ]; 
        };
  };
}
