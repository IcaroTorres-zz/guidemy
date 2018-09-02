import { increaseDays, colors } from '../helpers'
export default () => ({
  error: null,
  loading: false,
  sidebar: false,
  loggedUser: 'u1',
  users: {
    'u1': {
      username: 'icarotorres',
      id: 'u1',
      email: 'icaro.stuart@gmail.com',
      profilePicture: 'https://icarotorres.github.io/images/perfil1.jpg',
      tasks: ['t1'],
      projects: ['p1', 'p2', 'p3'],
      teams: ['tm1'],
      dailyMeetings: ['d1'],
      notifications: ['n1', 'n2', 'n3', 'n4']
    },
    'u2': {
      username: 'giltonsilva',
      id: 'u2',
      email: 'gilton.ferreira@dcomp.ufs.br',
      profilePicture: '',
      tasks: [],
      projects: ['p1', 'p2'],
      teams: ['tm1'],
      dailyMeetings: ['d1'],
      notifications: ['n1']
    }
  },
  projects: {
    'p1': {
      id: 'p1',
      creator: 'u2',
      manager: 'u2',
      coworkers: ['u1', 'u2'],
      title: 'Ferramenta Reativa para Gestão Ágil de Projetos Acadêmicos',
      description: 'Find process problems, co-workers dificulties and get the best returns from your teams engagement',
      company: 'UFS - Universidade Federal de Sergipe',
      blocks: [
        { text: 'To-do', color: 'primary', tasks: ['t1', 't1', 't1'] },
        { text: 'Doing', color: 'info', tasks: ['t1', 't2', 't2', 't2', 't2'] },
        { text: 'To-check', color: 'accent', tasks: ['t3', 't3', 't3', 't3', 't3'] },
        { text: 'To-fix', color: 'warning', tasks: ['t0', 't0', 't0'] },
        { text: 'Done', color: 'success', tasks: ['t4', 't4', 't4', 't4'] }
      ],
      dailyMeetings: ['d1'],
      start: new Date('07/14/2018'),
      end: null,
      finishedAt: null,
      notes: '',
      status: 0
    },
    'p2': {
      id: 'p2',
      creator: 'u1',
      manager: 'u1',
      coworkers: ['u1', 'u2'],
      title: 'Dummy Title',
      description: 'Dummy description',
      company: 'UFS - Universidade Federal de Sergipe',
      blocks: [
        { text: 'To-do', color: 'primary', tasks: ['t1', 't1', 't1'] },
        { text: 'Doing', color: 'info', tasks: ['t1', 't2', 't2', 't2', 't2'] },
        { text: 'Done', color: 'success', tasks: ['t4', 't4', 't4', 't4'] }
      ],
      dailyMeetings: ['d2'],
      start: new Date('08/02/2018'),
      end: null,
      finishedAt: null,
      notes: '',
      status: 0
    },
    'p3': {
      id: 'p3',
      creator: 'u1',
      manager: 'u1',
      coworkers: ['u1'],
      title: 'Project without blocks',
      description: 'A brand new project before fill with blocks to test behaviors',
      company: '',
      blocks: [
      ],
      dailyMeetings: [],
      start: new Date('08/30/2018'),
      end: null,
      finishedAt: null,
      notes: '',
      status: 0
    }
  },
  tasks: {
    't0': {
      id: 't0',
      creator: 'u1',
      project: 'p1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 15),
      finishedAt: null,
      comments: [],
      status: 0
    },
    't1': {
      id: 't1',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/22/2018'),
      end: increaseDays(new Date('08/22/2018'), 11),
      finishedAt: null,
      comments: ['c1', 'c2', 'c3', 'c4', 'c5'],
      status: 0
    },
    't2': {
      id: 't2',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/25/2018'),
      end: increaseDays(new Date('08/25/2018'), 21),
      finishedAt: null,
      comments: [],
      status: 0
    },
    't3': {
      id: 't3',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 8),
      finishedAt: null,
      comments: [],
      status: 0
    },
    't4': {
      id: 't4',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/22/2018'),
      end: increaseDays(new Date('08/22/2018'), 13),
      finishedAt: new Date('08/29/2018'),
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
      by: 'u1',
      at: 't1',
      date: new Date('08/19/2018'),
      text: 'uidyqwudbquidbnqi uyqbnwi https://material.io/tools/icons/?style=baseline qwdqwdqw',
      likes: ['u1', 'u2']
    },
    'c3': {
      id: 'c3',
      by: 'u1',
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
  dailyMeetings: {
    'd1': {
      id: 'd1',
      manager: 'u2',
      assigned: 'u1',
      r1: '',
      r2: '',
      r3: '',
      start: new Date(),
      end: null, // 24hr after
      finishedAt: null
    },
    'd2': {
      id: 'd2',
      manager: 'u2',
      assigned: 'u1',
      r1: '',
      r2: '',
      r3: '',
      start: new Date(),
      end: null, // 24hr after
      finishedAt: null
    }
  },
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
  },
  colors: colors
})
