import { increaseDays, generateDailies } from '../helpers'
const generatedDailes = {}

let p1u2Generated = generateDailies(generatedDailes,
  { startDate: new Date('07/14/2018') },
  'p1', 'u2', 'u1'
)
let p1u1Generated = generateDailies(generatedDailes,
  { startDate: new Date('07/14/2018') },
  'p1', 'u1', 'u1'
)
let p2u1Generated = generateDailies(generatedDailes,
  { startDate: new Date('08/18/2018') },
  'p2', 'u1', 'u1'
)
let p2u2Generated = generateDailies(generatedDailes,
  { startDate: new Date('08/18/2018') },
  'p2', 'u2', 'u1'
)
let p3u1Generated = generateDailies(generatedDailes,
  { startDate: new Date('08/30/2018') },
  'p3', 'u1', 'u3'
)
let p3u3Generated = generateDailies(generatedDailes,
  { startDate: new Date('08/30/2018') },
  'p3', 'u3', 'u3'
)

export default () => ({
  mini: false,
  lightOut: true,
  appError: null,
  appLoading: false,
  sidebar: true,
  snack: {
    active: false,
    message: '',
    color: 'secondary'
  },
  dictNamesToEmails: {
  },
  loggedUser: 'u1',
  users: {
    'u1': {
      username: 'icarotorres',
      userdisplayNamename: 'icarotorres',
      id: 'u1',
      email: 'icaro.stuart@gmail.com',
      picture: 'https://icarotorres.github.io/images/perfil1.jpg',
      tasks: ['t2', 't4'],
      projects: ['p1', 'p2', 'p3'],
      notifications: ['n1', 'n2', 'n3', 'n4']
    },
    'u3': {
      username: 'outro',
      displayName: 'outro',
      id: 'u3',
      email: 'outro@gmail.com',
      picture: '',
      tasks: [],
      projects: ['p3'],
      notifications: []
    },
    'u2': {
      username: 'giltonsilva',
      displayName: 'giltonsilva',
      id: 'u2',
      email: 'gilton.ferreira@dcomp.ufs.br',
      picture: '',
      tasks: ['t1', 't3', 't0'],
      projects: ['p1', 'p2'],
      notifications: []
    }
  },
  projects: {
    'p1': {
      id: 'p1',
      creator: 'u1',
      manager: 'u1',
      team: ['u1', 'u2'],
      title: 'Ferramenta Reativa para Gestão Ágil de Projetos Acadêmicos',
      description: 'Find process problems, co-workers dificulties and get the best returns from your teams engagement',
      blocks: ['b1', 'b2', 'b3', 'b4', 'b5'],
      dailyMeetings: {
        u1: p1u1Generated,
        u2: p1u2Generated
      },
      created: new Date('07/14/2018'),
      end: null,
      finished: null,
      status: 0
    },
    'p2': {
      id: 'p2',
      creator: 'u1',
      manager: 'u1',
      team: ['u1', 'u2'],
      title: 'Dummy Title',
      description: 'Dummy description',
      blocks: ['b6', 'b7', 'b8'],
      dailyMeetings: {
        u1: p2u1Generated,
        u2: p2u2Generated
      },
      created: new Date('08/18/2018'),
      end: null,
      finished: null,
      status: 0
    },
    'p3': {
      id: 'p3',
      creator: 'u1',
      manager: 'u3',
      team: ['u1', 'u3'],
      title: 'Project without blocks',
      description: 'A brand new project before fill with blocks to test behaviors',
      blocks: [],
      dailyMeetings: {
        u1: p3u1Generated,
        u3: p3u3Generated
      },
      created: new Date('08/30/2018'),
      end: null,
      finished: null,
      status: 0
    }
  },
  blocks: {
    'b1': {
      id: 'b1',
      project: 'p1',
      text: 'To-do',
      color: 'primary',
      tasks: []
    },
    'b2': {
      id: 'b2',
      project: 'p1',
      text: 'Doing',
      color: 'info',
      tasks: ['t2']
    },
    'b3': {
      id: 'b3',
      project: 'p1',
      text: 'To-check',
      color: 'accent',
      tasks: ['t3']
    },
    'b4': {
      id: 'b4',
      project: 'p1',
      text: 'To-fix',
      color: 'warning',
      tasks: ['t1', 't0']
    },
    'b5': {
      id: 'b5',
      project: 'p1',
      text: 'Done',
      color: 'success',
      tasks: []
    },
    'b6': {
      id: 'b6',
      project: 'p2',
      text: 'To-do',
      color: 'primary',
      tasks: []
    },
    'b7': {
      id: 'b7',
      project: 'p2',
      text: 'Doing',
      color: 'info',
      tasks: ['t4']
    },
    'b8': {
      id: 'b8',
      project: 'p2',
      text: 'Done',
      color: 'success',
      tasks: []
    }
  },
  tasks: {
    't0': {
      id: 't0',
      creator: 'u1',
      block: 'b4',
      assigned: 'u2',
      title: 'Dummy task title',
      description: 'task description',
      created: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 15),
      finished: null,
      comments: [],
      status: 0
    },
    't1': {
      id: 't1',
      creator: 'u1',
      block: 'b4',
      assigned: 'u2',
      title: 'Dummy task title',
      description: 'task description',
      created: new Date('08/22/2018'),
      end: increaseDays(new Date('08/22/2018'), 11),
      finished: null,
      comments: ['c1', 'c2', 'c3', 'c4', 'c5'],
      status: 0
    },
    't2': {
      id: 't2',
      creator: 'u1',
      block: 'b2',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      created: new Date('08/25/2018'),
      end: increaseDays(new Date('08/25/2018'), 21),
      finished: null,
      comments: [],
      status: 0
    },
    't3': {
      id: 't3',
      creator: 'u1',
      block: 'b3',
      assigned: 'u2',
      title: 'Dummy task title',
      description: 'task description',
      created: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 8),
      finished: null,
      comments: [],
      status: 0
    },
    't4': {
      id: 't4',
      creator: 'u1',
      block: 't7',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      created: new Date('08/22/2018'),
      end: increaseDays(new Date('08/22/2018'), 13),
      finished: new Date('08/29/2018'),
      comments: [],
      status: 1
    }
  },
  comments: {
    'c1': {
      id: 'c1',
      by: 'u1',
      at: 't1',
      date: new Date('08/18/2018'),
      text: 'iqbwib bdiqwn qwdb oquwhdbqowudbqouydhquwhdquiwhdn qowd qwdiuqw qwd qiuwdhqpwdmqwpoi qwdoiqjw d3209d so 982ed 1k2,  -09sdco1k32md12d0iaoms isjadosiamdç13 k0mv nqçwlekmd,1p30kdp9 8hp9cmnpodijmfçoi2j3f0 9oicjnxiuocjh92u3jrfço23k 09 jpu qn 93ndn kjlmdsoifj 9813ço m3m wudbqouwdnoq qwdq iqbwib bdiqwn qwdb oquwhdbqowudbqouydhquwhdquiwhdn qowd qwdiuqw qwd qiuwdhqpwdmqwpoi qwdoiqjw d3209d so 982ed 1k2,  -09sdco1k32md12d0iaoms isjadosiamdç13 k0mv nqçwlekmd,1p30kdp9 8hp9cmnpodijmfçoi2j3f0 9oicjnxiuocjh92u3jrfço23k 09 jpu qn 93ndn kjlmdsoifj 9813ço m3m wudbqouwdnoq qwdq iqbwib bdiqwn qwdb oquwhdbqowudbqouydhquwhdquiwhdn qowd qwdiuqw qwd qiuwdhqpwdmqwpoi qwdoiqjw d3209d so 982ed 1k2,  -09sdco1k32md12d0iaoms isjadosiamdç13 k0mv nqçwlekmd,1p30kdp9 8hp9cmnpodijmfçoi2j3f0 9oicjnxiuocjh92u3jrfço23k 09 jpu qn 93ndn kjlmdsoifj 9813ço m3m wudbqouwdnoq qwdq',
      likes: ['u1', 'u2']
    },
    'c2': {
      id: 'c2',
      by: 'u3',
      at: 't1',
      date: new Date('08/19/2018'),
      text: 'uidyqwudbquidbnqi uyqbnwi https://material.io/tools/icons/?style=baseline qwdqwdqw',
      likes: ['u1', 'u2']
    },
    'c3': {
      id: 'c3',
      by: 'u2',
      at: 't1',
      date: new Date('08/22/2018'),
      text: 'dummy test https://drive.google.com/drive/folders/1nz4rLyca0IlFph7DlRtSQkjVCWDgtb83 sample https://bit.ly/2Mq79KV',
      likes: ['u1']
    },
    'c4': {
      id: 'c4',
      by: 'u1',
      at: 't1',
      date: new Date('08/23/2018'),
      text: 'https://bit.ly/2Mq79KV',
      likes: ['u1']
    },
    'c5': {
      id: 'c5',
      by: 'u2',
      at: 't1',
      date: new Date('08/25/2018'),
      text: '@giltonsilva @icarotorres https://bit.ly/2Mq79KV',
      likes: ['u1']
    }
  },
  dailyMeetings: generatedDailes,
  // {
  // 'd1': {
  //  project: 'p1',
  //   id: 'd1',
  //   manager: 'u2',
  //   assigned: 'u1',
  //   r1: '',
  //   r2: '',
  //   r3: '',
  //   created: new Date(),
  //   end: increaseDays(new Date(), 1), // 24hr after
  //   finished: null,
  //   status: 0
  // },
  status: {
    0: 'active',
    1: 'done',
    2: 'closed'
  },
  notifications: {
    'n1': {
      id: 'n1',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n2': {
      id: 'n2',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n3': {
      id: 'n3',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n4': {
      id: 'n4',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    }
  }
})
