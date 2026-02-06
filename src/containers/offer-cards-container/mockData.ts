import {
  Offer,
  UserRoleEnum,
  ProficiencyLevelEnum,
  LanguagesEnum,
  StatusEnum
} from '~/types'

export const mockOffers: Offer[] = [
  {
    _id: '99',
    title:
      'Advanced Quantum Mechanics: Theoretical Mathematics, Mathematical Formulations in Modern Physics',
    price: 75,
    proficiencyLevel: [
      ProficiencyLevelEnum.Beginner,
      ProficiencyLevelEnum.Professional
    ],
    description:
      "Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    languages: [LanguagesEnum.Ukrainian, LanguagesEnum.English],
    enrolledUsers: ['user1', 'user2'],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author1',
      firstName: 'Jennifer',
      lastName: 'Wilsonsontelberg',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      professionalSummary:
        'Ph.D. in Physics with 10 years of teaching experience.',
      averageRating: {
        [UserRoleEnum.Tutor]: 3.5,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 10,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub1', name: 'German' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: '67',
    title: 'Theoretical Mathematics and Logic for Computer Science',
    price: 120,
    proficiencyLevel: [ProficiencyLevelEnum.Professional],
    description:
      'Deep dive into discrete mathematics and its applications in modern software engineering and cryptography.',
    languages: [LanguagesEnum.English],
    enrolledUsers: [],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author2',
      firstName: 'Alexander',
      lastName: 'Wilson',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      professionalSummary: 'Senior Math Consultant at TechCorp.',
      averageRating: {
        [UserRoleEnum.Tutor]: 5.0,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 23,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub2', name: 'Mathematics' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-02-10T12:00:00Z'
  },
  {
    _id: '78',
    title:
      'Advanced Quantum Mechanics: Theoretical Mathematics, Mathematical Formulations in Modern Physics',
    price: 75,
    proficiencyLevel: [
      ProficiencyLevelEnum.Beginner,
      ProficiencyLevelEnum.Advanced
    ],
    description:
      "Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable...",
    languages: [LanguagesEnum.Ukrainian, LanguagesEnum.English],
    enrolledUsers: ['user1', 'user2'],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author1',
      firstName: 'Jennifer',
      lastName: 'Wilsonsontelberg',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      professionalSummary:
        'Ph.D. in Physics with 10 years of teaching experience.',
      averageRating: {
        [UserRoleEnum.Tutor]: 3.5,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 10,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub1', name: 'German' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: '32',
    title: 'Theoretical Mathematics and Logic for Computer Science',
    price: 120,
    proficiencyLevel: [ProficiencyLevelEnum.Professional],
    description:
      'Deep dive into discrete mathematics and its applications in modern software engineering and cryptography.',
    languages: [LanguagesEnum.English],
    enrolledUsers: [],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author2',
      firstName: 'Alexander',
      lastName: 'Wilson',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      professionalSummary: 'Senior Math Consultant at TechCorp.',
      averageRating: {
        [UserRoleEnum.Tutor]: 5.0,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 23,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub2', name: 'Mathematics' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-02-10T12:00:00Z'
  },
  {
    _id: '01',
    title:
      'Advanced Quantum Mechanics: Theoretical Mathematics, Mathematical Formulations in Modern Physics',
    price: 75,
    proficiencyLevel: [
      ProficiencyLevelEnum.Beginner,
      ProficiencyLevelEnum.Advanced
    ],
    description:
      "Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable...",
    languages: [LanguagesEnum.Ukrainian, LanguagesEnum.English],
    enrolledUsers: ['user1', 'user2'],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author1',
      firstName: 'Jennifer',
      lastName: 'Wilsonsontelberg',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      professionalSummary:
        'Ph.D. in Physics with 10 years of teaching experience.',
      averageRating: {
        [UserRoleEnum.Tutor]: 3.5,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 10,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub1', name: 'German' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: '37',
    title: 'Theoretical Mathematics and Logic for Computer Science',
    price: 120,
    proficiencyLevel: [ProficiencyLevelEnum.Professional],
    description:
      'Deep dive into discrete mathematics and its applications in modern software engineering and cryptography.',
    languages: [LanguagesEnum.English],
    enrolledUsers: [],
    authorRole: UserRoleEnum.Tutor,
    author: {
      _id: 'author2',
      firstName: 'Alexander',
      lastName: 'Wilson',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      professionalSummary: 'Senior Math Consultant at TechCorp.',
      averageRating: {
        [UserRoleEnum.Tutor]: 5.0,
        [UserRoleEnum.Student]: 0
      },
      totalReviews: {
        [UserRoleEnum.Tutor]: 23,
        [UserRoleEnum.Student]: 0
      },
      FAQ: {
        [UserRoleEnum.Tutor]: [],
        [UserRoleEnum.Student]: []
      }
    },
    subject: { _id: 'sub2', name: 'Mathematics' },
    category: {
      _id: 'cat2',
      name: 'Computer Science',
      appearance: {
        icon: 'some-icon-path.svg',
        color: '#2196f3'
      },
      totalOffers: {
        [UserRoleEnum.Tutor]: 150,
        [UserRoleEnum.Student]: 0
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    FAQ: [],
    status: StatusEnum.Active,
    createdAt: '2024-02-10T12:00:00Z',
    updatedAt: '2024-02-10T12:00:00Z'
  }
]
