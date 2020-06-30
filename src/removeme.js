const PROD = false;
const lex = require('greenlock-express').create({
    version: 'draft-11', server: PROD ? 'https://acme-v02.api.letsencrypt.org/directory' : 'https://acme-staging-v02.api.letsencrypt.org/directory', approveDomains: (opts, certs, cb) => {
        if (certs) {
            // change domain list here
            opts.domains = ['example.com', 'yourdomain.com']
        } else {
            // change default email to accept agreement
            opts.email = 'youremail@here.com';
            opts.agreeTos = true;
        }
        cb(null, { options: opts, certs: certs });
    }  // optional: see "Note 3" at the end of the page
    // communityMember: true});
}); 