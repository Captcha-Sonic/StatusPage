const pageConfig = {
  title: "CaptchaSonic's Status Page",
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
  monitors: [
    {
      id: 'task_api',
      name: 'task_api',
      method: 'POST',
      target: 'https://api.captchasonic.com/createTask',
      tooltip: 'Main Solutions API of CaptchaSonic Service',
      statusPageLink: 'https://my.captchasonic.com',
      expectedCodes: [200, 400],
      timeout: 10000,
      body: {
        "apiKey": "statuspage",
        "task": {
          "type": "statuspage",
          "queries": []
          }
      },
    },
    {
      id: 'homepage',
      name: 'homepage',
      method: 'GET',
      target: 'https://captchasonic.com',
      tooltip: 'captchasonic.com',
      statusPageLink: 'https://captchasonic.com',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'dashboard_api',
      name: 'dashboard_api',
      method: 'GET',
      target: 'https://myapi.captchasonic.com/',
      tooltip: 'Dashboard API',
      statusPageLink: 'https://my.captchasonic.com',
      expectedCodes: [404],
      timeout: 10000,
    },
    {
      id: 'balance_api',
      name: 'balance_api',
      method: 'GET',
      target: 'https://api.captchasonic.com/balance?apiKey=sonic_c33ee86ac0d7296fe95b723a65b11ab7',
      tooltip: 'This is a tooltip for this monitor',
      statusPageLink: 'https://my.captchasonic.com',
      expectedCodes: [200, 400],
      timeout: 10000,
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
