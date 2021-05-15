{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    yarn2nix = { url = "github:nix-community/yarn2nix"; flake = false; };
  };

  outputs = inputs:
    let
      api_url = "http://localhost:8000";
      stream_url = "http://cast.based.radio/vgm.ogg";
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;
      y2n = (import "${inputs.yarn2nix}/default.nix" { pkgs = pkgs; });
    in with y2n;
    {
      packages.x86_64-linux.basedcast_web = pkgs.yarn2nix-moretea.mkYarnPackage {
            name = "basedcast_web";
            src = ./web;
            packageJSON = ./web/package.json;
            yarnLock = ./web/yarn.lock;
            yarnNix = ./web/yarn.nix;
      };
    };
      #mapAttrs' mkContainer outputs.packages
}