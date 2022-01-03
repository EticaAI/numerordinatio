# Privacy policy

**TL;DR: https://numerordinatio.etica.ai/ does not track users. We don't have a cookie policy because we don't use cookies. All information is in your local computer.**

The source code can be obtained at https://github.com/EticaAI/numerordinatio and license allow re-reploy to meet any additional stricter privacy needs.

## General explanation
The <em lang="la">Numerordĭnātĭo</em> playground released by Etica.AI is a client-side application.
It doesn't require a complex web server to make operations, because all data is loaded on your local browser. Your browser may run out of memory, may crash, but Etica.AI don't know who you are.

Etica.AI does't have a "cookie policy" because don't use cookies to track users.
Not even to "improve user experience".
And even for static assets hosted on free platforms, and when loading assets from HTML,
the code is done in ways that give as less information as possible of the end user.

The reason we don't include all external CSS and JavaScript from third-parties
(so, they could not track) is to make easier for stricter organizations audit only code produced by Etica.AI volunteers.

----

> These notes are relevant if this site is accessed outside Etica.AI.
> The Etica.AI volunteers see no problem with re-hosting either to save bandwidth or to adhere to local laws.

## Etiquete for re-hosting

For users re-hosting the public domain <em lang="la">Numerordĭnātĭo</em> playgroud code outside of <a href="https://numerordinatio.etica.ai/">https://numerordinatio.etica.ai/</a> and are aware that is collecting more data than Etica.AI version: <strong>we kindly ask to take time to anotate additional data collection</strong>. For sake of comparison:

- (This is _obvious_, but just saying) Your Internet service provider (ISP) and your local browser history now have some rudimentary knowledge of your internet browsing.
- Data accessed via `*.etica.ai`, both HTTP and HTTPS versions, uses Cloudflare resolvers
  - https://www.cloudflare.com/privacypolicy/
- Downloading bulk data to host your version still uses GitHub infrastructure
  - https://docs.github.com/privacy

Please note that both Cloudflare and GitHub privacy policies are designed for users of their sites, so they can add "Google Analytics", "3rd party tracking JavaScript" etc. So, 90% of their privacy policies are not relevant for end users of sites based on their free services. The 10% are mostly facts that an IP, at a given time, accessed a website.

### Ideal usage on intranets
If not by privacy, for sake of low usage of download datasets (or even for common cases on humanitarian sector, like need on remote areas using only expensive internet via phone or satellite) please download everyting and have some local host.

The main reason you cannot simply "right-click" the index.html to load files is because [Cross-origin resource sharing
](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) will consider insecure load files from `file:///` protocol.
So, if you do not have help to setup on an intranet, you can setup a local webserver and access via `http://localhost/numerordinatio`.
