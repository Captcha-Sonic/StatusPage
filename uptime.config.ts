const pageConfig = {
  // Title for your status page
  title: "lyc8503's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://my.captchasonic.com', label: 'Dashboard' },
    { link: 'https://captchasonic.com', label: 'Homepage' },
    { link: 'https://github.com/orgs/Captcha-Sonic/repositories', label: 'Github' },
    { link: 'mailto:github@captchasonic.com', label: 'Email Me', highlight: true },
  ],
}

const workerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // Example HTTP Monitor
    {
      id: 'foo_monitor',
      name: 'My API Monitor',
      method: 'GET',
      target: 'https://www.google.com'
    },
    {
      id: 'test_tcp_monitor',
      name: 'Example TCP Monitor',
      method: 'TCP_PING',
      target: '1.1.1.1:22'
    },
    {
      id: 'solver_api',
      name: 'solver_api',
      method: 'POST',
      target: 'https://api.captchasonic.com/createTask',
      tooltip: 'This is main SolutionsAPI of captchasonic service',
      statusPageLink: 'https://my.captchasonic.com',
      expectedCodes: [200],
      timeout: 20000,
      headers: {
        'content-type:': 'application/json',
      },
      body: {
        "apiKey": "${{ secrets.APIKEY }}",
        "task": {
          "type": "OcrImage",
          "screenshot": true,
          "queries": [
            "image1_base64",
            "image2_base64"
          ],
          "numeric": true,
          "module": "bls",
          "case": false,
          "maxLength": 3
        }
      },
      // responseKeyword: 'success',
      // checkLocationWorkerRoute: 'https://xxx.example.com',
    },
    {
      id: 'demo',
      name: 'demo',
      method: 'GET',
      target: 'https://swapi.py4e.com/api/people/?page=2',
      headers: {
        'content-type:': 'application/json',
      },
      tooltip: 'demo',
      statusPageLink: 'https://swapi.py4e.com/api/people/?page=2',
      expectedCodes: [200],
      timeout: 20000,
      // responseKeyword: 'success',
    },
  ],
  // notification: {
  //   // [Optional] apprise API server URL
  //   // if not specified, no notification will be sent
  //   appriseApiServer: "https://apprise.example.com/notify",
  //   // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
  //   // if not specified, no notification will be sent
  //   recipientUrl: "tgram://bottoken/ChatID",
  //   // [Optional] timezone used in notification messages, default to "Etc/GMT"
  //   timeZone: "Asia/Shanghai",
  //   // [Optional] grace period in minutes before sending a notification
  //   // notification will be sent only if the monitor is down for N continuous checks after the initial failure
  //   // if not specified, notification will be sent immediately
  //   gracePeriod: 5,
  // },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here

      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
