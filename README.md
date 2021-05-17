<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
![Docker Build](https://github.com/rpgwaiter/basedradio/actions/workflows/docker-image.yml/badge.svg)



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/rpgwaiter/basedradio">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">BasedRadio</h1>

  <p align="center">
    WebUI for <a href="https://github.com/rpgwaiter/basedcast">BasedCast </a>Streams
    <br />
    <a href="https://github.com/rpgwaiter/basedradio"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rpgwaiter/basedradio">View Demo</a>
    ·
    <a href="https://github.com/rpgwaiter/basedradio/issues">Report Bug</a>
    ·
    <a href="https://github.com/rpgwaiter/basedradio/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#nix">Nix</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT -->
## About BasedRadio

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

BasedRadio is a WebUI for use with a <a href="https://github.com/rpgwaiter/basedcast">BasedCast</a> instance. With cast/radio, one can easily stand up their own video game music streaming site. 

The official instance is hosted at https://based.radio. Project is in early-alpha.


### Built With

* [create-react-app](https://github.com/facebook/create-react-app)
* [nix](https://nixos.org/manual/nixpkgs/stable/)


<!-- GETTING STARTED -->
## Getting Started
### Deployment
If you're fine with the official based.radio stream, you can get up and running with this one-liner:
```sh
docker run -d -p 3001:80 rpgwaiter/basedradio
```
Then connect in your browser: [http://localhost:3001](http://localhost:3001)

If you want to use your own music, you'll need to deploy your own instance of [basedcast](https://github.com/rpgwaiter/basedcast)
#### Prerequisites
* Docker
* Git

1. Clone the repo
   ```sh
   git clone https://github.com/rpgwaiter/basedradio.git
   cd basedradio
   ```
2. Edit the .env file
   ```sh
   cp .env.example .env
   nano .env
   ```
3. Run the config generator
   ```sh
   chmod +x env.sh
   ./env.sh
   ```
4. Build and run the container
   ```sh
   docker build . -t 'basedradio'
   docker run basedradio
   ```

## Development
If you want to hack around, follow 1-3 above, then:
```sh
yarn install
yarn dev
```

## Nix
If you use nix/NixOS (and you should), there is a flake.nix for providing a devshell and nix derivation.

### Build Derivation (requires nix flakes)
```sh
nix build github:rpgwaiter/basedradio#basedradio
```

### Enter Development Shell
```sh
nix develop github:rpgwaiter/basedradio#devShell.x86_64-linux
```

<!-- USAGE EXAMPLES -->
## Usage

By default, BasedRadio (and the builds on dockerhub) are setup to use the official BasedCast instance at [https://cast.based.radio/vgm.ogg](https://cast.based.radio/vgm.ogg)

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap
* GraphQL Client
* Login
* Monolith container with radio/cast/db

See the [open issues](https://github.com/rpgwaiter/basedradio/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GPL3 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Rpgwaiter - [@rpgwaiter](https://twitter.com/rpgwaiter) - rpgwaiter@based.zone

Project Link: [https://github.com/rpgwaiter/basedradio](https://github.com/rpgwaiter/basedradio)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Nightwave Plaza](https://plaza.one)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/rpgwaiter/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/rpgwaiter/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rpgwaiter/repo.svg?style=for-the-badge
[forks-url]: https://github.com/rpgwaiter/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/rpgwaiter/repo.svg?style=for-the-badge
[stars-url]: https://github.com/rpgwaiter/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/rpgwaiter/repo.svg?style=for-the-badge
[issues-url]: https://github.com/rpgwaiter/repo/issues
[license-shield]: https://img.shields.io/github/license/rpgwaiter/repo.svg?style=for-the-badge
[license-url]: https://github.com/rpgwaiter/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rpgwaiter
