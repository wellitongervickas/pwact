var fs = require("fs")
var pwact = {}
if (fs.existsSync("pwact.json")) {
  console.log('[PWAct]', 'Reading previous settings');
  pwact = JSON.parse(fs.readFileSync("pwact.json", "utf8"));
}

if (pwact.paths && pwact.paths.package)
    var package = JSON.parse(fs.readFileSync(pwact.paths.package, "utf8"));
else
    var package = JSON.parse(fs.readFileSync("package.json", "utf8"));

module.exports = {

    args: process.argv.slice(2),
    paths: {
        manifest: (pwact.paths && pwact.paths.manifest) ? pwact.paths.manifest : 'manifest.json',
        package: (pwact.paths && pwact.paths.package) ? pwact.paths.package : 'package.json',
        worker: (pwact.paths && pwact.paths.worker) ? pwact.paths.worker : 'service-worker.js',
        pwa: (pwact.paths && pwact.paths.pwa) ? pwact.paths.pwa : 'app.js',
        icon: (pwact.paths && pwact.paths.icon) ? pwact.paths.icon : 'assets/images/icons',
    },
    available_commands: [
        "help",
        "init",
        "start",
        "cache",
        "icon",
        "manifest",
        "related_apps"
    ],
    available_manifest: [
        "name",
        "short_name",
        "theme_color",
        "background_color",
        "description",
        "display",
        "lang",
        "dir",
        "scope",
        "start_url",
        "manifest_version",
        "author",
        "homepage_url"
    ],
    npm_name: package.name,
    npm_description: package.description || "Simple description",
    help: [
            {
                command: "init",
                description: "Create a new PWAct file",
                parameters: []
            },
            {
                command: "start",
                description: "Create service worker, manifest.json and a blank index.html",
                parameters: []
            },
            {
                command: "cache",
                description: "Push an item to service worker",
                parameters: [
                    {
                        name: "1 (file)",
                        description: "The path of file to be cached by the service worker",
                        example: "pwact cache foo.html"
                    }
                ]
            },
            {
                command: "icon",
                description: "Create and resize icons based in manifest.json specs",
                parameters: [
                    {
                        name: "1 (icon_origin)",
                        description: "The path of the image to be copied and resized (min 512x512)",
                        example: "pwact icon img/logo.png"
                    }
                ]
            },
            {
                command: "manifest",
                description: "Changes manifest.json properties. Note: This can override previous information and will not update pwact.json",
                parameters: [
                    {
                        name: "1 (set:$property) 2 (string)",
                        description: "Set the given application property",
                        accepted: [
                            "name",
                            "short_name",
                            "theme_color",
                            "background_color",
                            "description",
                            "display",
                            "lang",
                            "dir",
                            "scope",
                            "start_url",
                            "manifest_version",
                            "author",
                            "homepage_url"
                        ],
                        example: "pwact manifest set:orientation portrait"
                    }
                ]
            },
            {
                command: "related_apps",
                description: "Push a external app in Manifest.json",
                parameters: []
            }

    ]
}
