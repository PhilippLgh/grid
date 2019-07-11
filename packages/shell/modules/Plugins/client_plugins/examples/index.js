const platform = process.platform === 'win32' ? 'windows' : process.platform

module.exports = {
  name: 'swarm',
  displayName: 'Swarm',
  type: 'storage',
  repository: 'https://ethswarm.blob.core.windows.net',
  filter: {
    name: {
      includes: [platform],
      excludes: ['unstable']
    }
  },
  settings: [
    {
      id: 'bzzaccount',
      label: 'Bzz Account',
      default: 'dd867755678aa59b98663e5fde5b6a7ef8e963b0',
      flag: '--bzzaccount %s'
    },
    {
      id: 'password',
      label: 'Account Password',
      type: 'path',
      flag: '--password %s'
    },
    {
      id: 'cors',
      label: 'Cors Domain',
      default: 'http://localhost:3000',
      flag: '--corsdomain %s'
    }
  ]
}
