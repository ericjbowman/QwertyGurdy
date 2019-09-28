import Wad from 'web-audio-daw'
const config = require('./config.js')
const store = require('./store.js')
const api = require('./api.js')
const indexUploads = require('./templates/index-uploads.handlebars')
const indexOneShots = require('./templates/index-oneShots.handlebars')
const indexSOneShots = require('./templates/index-s-oneShots.handlebars')
const indexDOneShots = require('./templates/index-d-oneShots.handlebars')
const indexFOneShots = require('./templates/index-f-oneShots.handlebars')
const indexJOneShots = require('./templates/index-j-oneShots.handlebars')
const indexKOneShots = require('./templates/index-k-oneShots.handlebars')
const indexLOneShots = require('./templates/index-l-oneShots.handlebars')
// const getFormFields = require('../../lib/get-form-fields.js')

let loop = 'loop1'

const state = {
  volume: 0.5,
  url: '',
  oneShotUrl: '',
  detune: 0,
  s: '',
  d: '',
  f: '',
  j: '',
  k: '',
  l: ''
}

let producer = 'Mr-Bill'
const producers = ['Mr-Bill', 'Oliver', 'Pascaal', 'Tennyson', 'Torres-Rengifo', 'Custom']

const kits = {
  'Mr-Bill': {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop1.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop2.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop3.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillKick1.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc2.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare4.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillHat1.wav`,
        volume: 0.4,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc1.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare3.wav`,
        volume: 0.4,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  },
  // PointPoint: {
  //   loop1: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop1.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   loop2: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop2.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   loop3: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop3.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   s: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint1.wav`,
  //       volume: 0.5 }
  //   ),
  //   d: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint2.wav`,
  //       volume: 0.5
  //       // reverb: {
  //       //   wet: 0.5,
  //       //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
  //       // }
  //       // Reverb slows everything down interfering with sound rendering
  //     }
  //   ),
  //   f: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint4.wav`,
  //       volume: 0.5 }
  //   ),
  //   j: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint3.wav`,
  //       volume: 0.3 }
  //   ),
  //   k: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint5.wav`,
  //       volume: 0.5 }
  //   ),
  //   l: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint6.wav`,
  //       volume: 0.3 }
  //   )
  // },
  Pascaal: {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop1.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop2.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop3.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalKick1.wav`,
        volume: 0.6,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalTom.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnare1.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalHat1.wav`,
        volume: 0.3,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc3.wav`,
        volume: 0.5,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc2.wav`,
        volume: 0.3,
        detune: 0,
        // reverb: {
        //   wet: 0,
        //   impulse: 'public/CementBlocks1.wav'
        // },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  },
  Tennyson: {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  },
  Oliver: {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  },
  'Torres-Rengifo': {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop4.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoHat1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoRim1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  },
  Custom: {
    loop1: new Wad(
      { source: state.url,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        },
        filter: {
          type: 'lowpass', // What type of filter is applied.
          frequency: 20000, // The frequency, in hertz, to which the filter is applied.
          q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
          // env: { // Filter envelope.
          //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
          //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
          // }
        }
      }
    )
  }
}

let customLoop

const playLoop = () => {
  if (producer === 'Custom' && $('.play-btn').hasClass('play')) {
    customLoop = new Wad(
      { source: state.url,
        loop: true,
        volume: state.volume,
        detune: state.detune
      }
    )
    customLoop.play({ loop: true })
  }
  if ($('.play-btn').hasClass('play')) {
    $('.play-btn').html('Stop')
    $('.play-btn').removeClass('play')
    $('.play-btn').addClass('stop')
    if (producer !== 'Custom') {
      Wad.stopAll()
      kits[producer][loop].play(
        { loop: true,
          volume: state.volume
        })
    }
  } else {
    $('.play-btn').html('Play')
    $('.play-btn').removeClass('stop')
    $('.play-btn').addClass('play')
    Wad.stopAll()
  }
}

const stop = () => {
  Wad.stopAll()
}
// const playSaw = () => {
//   saw.stop()
//   saw.play()
// }
// let detune = 0

// const adjustStateVolume = event => {
//   this.setState({
//     [event.target.name]: {
//       ...this.state[event.target.name],
//       volume: event.target.value
//     }
//   })
//   console.log('volume', this.state.pointLoop.volume)
//   // Wad.setVolume(this.state.pointLoop.volume)
// }
// const adjustStateRate = event => {
//   this.setState({
//     [event.target.name]: {
//       ...this.state[event.target.name],
//       rate: event.target.value
//     }
//   })
//   console.log('rate', this.state.pointLoop.rate)
//   // Wad.setRate(this.state.pointLoop.rate)
// }
// const setVolume = (event) => {
//   const promise = new Promise(function (resolve, reject) {
//     resolve(adjustStateVolume(event))
//   })
//   promise
//     .then(() => Wad.setVolume(this.state.pointLoop.volume))
//     .then(() => console.log('from promise chain'))
//     .catch(console.error)
// }
// const setRate = (event) => {
//   const promise = new Promise(function (resolve, reject) {
//     resolve(adjustStateRate(event))
//   })
//   promise
//     .then(() => pointLoop.setRate(this.state.pointLoop.rate))
//     .then(() => console.log('from promise chain'))
//     .catch(console.error)
// }

const onkeyDown = event => {
  $(`#${event.keyCode}`).addClass('key-pressed')
  switch (event.keyCode) {
    case 83 : kits[producer].s.play()
      break
    case 68 : kits[producer].d.play()
      break
    case 70 : kits[producer].f.play()
      break
    case 74 : kits[producer].j.play()
      break
    case 75 : kits[producer].k.play()
      break
    case 76 : kits[producer].l.play()
      break
  }
}

const onkeyUp = event => {
  $(`#${event.keyCode}`).removeClass('key-pressed')
}

const onChangeVolume = event => {
  customLoop.setVolume(event.target.valueAsNumber)
  kits[producer][loop].setVolume(event.target.valueAsNumber)
  state.volume = event.target.valueAsNumber
  producers.forEach(x => {
    kits[x][loop].volume = (event.target.valueAsNumber)
  })
  console.log('event', event.target.valueAsNumber)
}

// const onChangeRate = event => {
//   kits.PointPoint.loop.setRate(event.target.valueAsNumber)
//   console.log('event', event.target.valueAsNumber)
// }

const onChangeDetune = event => {
  state.detune = event.target.valueAsNumber
  producers.forEach(x => {
    kits[x][loop].detune = (event.target.valueAsNumber)
  })
  if (producer !== 'Custom') {
    kits[producer][loop].setDetune(event.target.valueAsNumber)
    console.log('event', event.target.valueAsNumber)
  } else {
    customLoop.setDetune(event.target.valueAsNumber)
  }
}

const onChangeKeyVolume = (event, key) => {
  producers.forEach(prod => {
    // kits[producer][key] = new Wad({
    //   source: kits[producer][key].source,
    //   detune: kits[producer][key].detune,
    //   reverb: {
    //     wet: kits[producer][key].reverb.wet,
    //     impulse: 'public/CementBlocks1.wav'
    //   },
    //   filter: {
    //     type: kits[prod][key].filter[0].type ? kits[prod][key].filter[0].type : kits[prod][key].filter.type, // What type of filter is applied.
    //     frequency: kits[prod][key].filter[0].frequency ? kits[prod][key].filter[0].frequency : kits[prod][key].filter.frequency, // The frequency, in hertz, to which the filter is applied.
    //     q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   },
    //   volume: event.target.valueAsNumber
    // })
    kits[prod][key] = new Wad({
      ...kits[prod][key],
      volume: event.target.valueAsNumber
    })
  })
}

const onChangeKeyDetune = (event, key) => {
  producers.forEach(prod => {
    // kits[producer][key] = new Wad({
    //   source: kits[producer][key].source,
    //   volume: kits[producer][key].volume,
    //   reverb: {
    //     wet: kits[producer][key].reverb.wet,
    //     impulse: 'public/CementBlocks1.wav'
    //   },
    //   filter: {
    //     type: kits[prod][key].filter[0].type ? kits[prod][key].filter[0].type : kits[prod][key].filter.type, // What type of filter is applied.
    //     frequency: kits[prod][key].filter[0].frequency ? kits[prod][key].filter[0].frequency : kits[prod][key].filter.frequency, // The frequency, in hertz, to which the filter is applied.
    //     q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   },
    //   detune: event.target.valueAsNumber
    // })
    kits[prod][key] = new Wad({
      ...kits[prod][key],
      detune: event.target.valueAsNumber
    })
  })
}

const onChangeKeyReverb = (event, key) => {
  producers.forEach(prod => {
    // kits[prod][key] = new Wad({
    //   source: kits[prod][key].source,
    //   volume: kits[prod][key].volume,
    //   detune: kits[prod][key].detune,
    //   reverb: {
    //     wet: event.target.valueAsNumber,
    //     impulse: 'public/CementBlocks1.wav'
    //   },
    //   filter: {
    //     type: kits[prod][key].filter[0].type ? kits[prod][key].filter[0].type : kits[prod][key].filter.type, // What type of filter is applied.
    //     frequency: kits[prod][key].filter[0].frequency ? kits[prod][key].filter[0].frequency : kits[prod][key].filter.frequency, // The frequency, in hertz, to which the filter is applied.
    //     q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   }
    // })
    kits[prod][key] = new Wad({
      ...kits[prod][key],
      reverb: {
        wet: event.target.valueAsNumber,
        impuls: 'public/CementBlocks1.wav'
      }
    })
  })
}

const onChangeKeyFilter = (event, key) => {
  console.log('filter freq', kits[producer][key].filter.frequency)
  console.log('filter type', kits[producer][key].filter.type)
  producers.forEach(prod => {
    // kits[prod][key] = new Wad({
    //   source: kits[prod][key].source,
    //   volume: kits[prod][key].volume,
    //   detune: kits[prod][key].detune,
    //   reverb: {
    //     wet: kits[prod][key].reverb.wet,
    //     impulse: 'public/CementBlocks1.wav'
    //   },
    //   filter: {
    //     type: kits[prod][key].filter[0].type ? kits[prod][key].filter[0].type : kits[prod][key].filter.type, // What type of filter is applied.
    //     frequency: event.target.valueAsNumber, // The frequency, in hertz, to which the filter is applied.
    //     q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   }
    // })
    kits[prod][key] = new Wad({
      ...kits[prod][key],
      filter: {
        frequency: event.target.valueAsNumber
      }
    })
  })
  console.log('filter freq after freq change func', kits[producer][key].filter.frequency)
  console.log('filter type after freq change func', kits[producer][key].filter.type)
  console.log('kit producer key', kits[producer][key])
}

const onChangeKeyFilterType = (event, key) => {
  console.log('key filter type', event.target.value)
  producers.forEach(prod => {
    // kits[prod][key] = new Wad({
    //   source: kits[prod][key].source,
    //   volume: kits[prod][key].volume,
    //   detune: kits[prod][key].detune,
    //   reverb: {
    //     wet: kits[prod][key].reverb.wet,
    //     impulse: 'public/CementBlocks1.wav'
    //   },
    //   filter: {
    //     type: event.target.value, // What type of filter is applied.
    //     frequency: kits[prod][key].filter[0].frequency ? kits[prod][key].filter[0].frequency : kits[prod][key].filter.frequency, // The frequency, in hertz, to which the filter is applied.
    //     q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   }
    // })
    kits[prod][key] = new Wad({
      ...kits[prod][key],
      filter: {
        type: event.target.value
      }
    })
  })
  console.log('kit producer key', kits[producer][key].filter[0].frequency)
}

const onSelectLoop = event => {
  switch (event.target.value) {
    case 'Loop 1': loop = 'loop1'
      break
    case 'Loop 2': loop = 'loop2'
      break
    case 'Loop 3': loop = 'loop3'
      break
  }
}

const onSelectCustomLoop = event => {
  state.url = event.target.value
  console.log('event.target.value', event.target.value)
}

const setCustomOneShot = (letter, value) => {
  kits.Custom[letter] = new Wad(
    { source: value,
      volume: kits.Custom.s.volume,
      detune: kits.Custom.s.detune,
      reverb: {
        wet: kits.Custom.s.reverb.wet,
        impulse: 'public/CementBlocks1.wav'
      },
      filter: {
        type: kits.Custom.s.filter[0].type ? kits.Custom.s.filter[0].type : kits.Custom.s.filter.type, // What type of filter is applied.
        frequency: kits.Custom.s.filter[0].frequency ? kits.Custom.s.filter[0].frequency : kits.Custom.s.filter.frequency, // The frequency, in hertz, to which the filter is applied.
        q: 1 // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
        // env: { // Filter envelope.
        //   frequency: 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
        //   attack: 0.1 // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
        // }
      }
    }
  )
}

const onSelectCustomOneShotS = event => {
  console.log('custom one shot selected', event.target.value)
  setCustomOneShot('s', event.target.value)
  // state.oneShotUrl = event.target.value
  console.log('event.target.value', event.target.value)
}

const onClickProducer = (selectedProducer) => {
  producer = selectedProducer
  const dormantProducers = producers.filter(x => x !== selectedProducer)
  dormantProducers.forEach(dormantProducer => {
    $(`#${dormantProducer}-text`).removeClass('selected')
  })
  $('#producer-title').html(`${selectedProducer} Samples`)
  $(`#${selectedProducer}-text`).addClass('selected')
  if (selectedProducer === 'Custom') {
    $('#presets').hide()
    $('#handlebar-uploads').show()
    $('.handlebar-oneShots').show()
  } else {
    $('#handlebar-uploads').hide()
    $('#presets').show()
    $('.handlebar-oneShots').hide()
  }
}

// const soundUpload = formData => {
//   return $.ajax({
//     method: 'POST',
//     url: config.apiUrl + '/sounds',
//     contentType: false, // you use this because StackOverFlow. but basically you just don't want jQuery to interfere, because we've already set the content type
//     processData: false, // same here
//     data: formData, // then we can just send it as is because it's already formatted
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

const indexAndShowUploads = () => {
  api.indexUploads()
    .then((responseData) => {
      $('#handlebar-uploads').html(indexUploads({ uploads: responseData.uploads.reverse() }))
      return responseData
    })
    .then((responseData) => {
      store.uploads = responseData.uploads
      return responseData
    })
    .then(() => { state.url = store.uploads[0].url })
    .then(() => {
      customLoop = new Wad(
        { source: state.url,
          loop: true,
          volume: state.volume,
          detune: state.detune
        }
      )
    })
    .catch(console.log)
}

const indexAndShowOneShots = () => {
  api.indexOneShots()
    .then((responseData) => {
      $('#s-handlebar-oneShots').html(indexSOneShots({ oneShots: responseData.oneShots.reverse() }))
      return responseData
    })
    .then((responseData) => {
      store.oneShots = responseData.oneShots
      return responseData
    })
    .then(() => { state.oneShotUrl = store.oneShots[0].url })
    .then(() => setCustomOneShot('s', store.oneShots[0].url))
    .catch(console.log)
}

const changeKeyParams = () => {
  const keys = ['s', 'd', 'f', 'j', 'k', 'l']
  keys.forEach(key => {
    $(`#${key}-volume`).on('change', (event) => onChangeKeyVolume(event, `${key}`))
    $(`#${key}-detune`).on('change', (event) => onChangeKeyDetune(event, `${key}`))
    $(`#${key}-reverb`).on('change', (event) => onChangeKeyReverb(event, `${key}`))
    $(`#${key}-filter`).on('change', (event) => onChangeKeyFilter(event, `${key}`))
    $(`.${key}-filter-type`).on('change', (event) => onChangeKeyFilterType(event, `${key}`))
  })
}

const uploadOneShot = event => {
  event.preventDefault()
  const formData = new FormData(event.target)
  console.log('formData', formData.keys())

  $.ajax({
    method: 'POST',
    url: config.apiUrl + '/oneShots',
    data: formData,
    contentType: false,
    processData: false
  })
    .then(console.log)
    .then(indexAndShowOneShots)
    .catch(() => alert('failure'))
}

const addHandlers = () => {
  const httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav')
  httpRequest.addEventListener('load', e => $('.loader').hide())
  httpRequest.send()

  indexAndShowUploads()
  indexAndShowOneShots()

  $('#handlebar-uploads').hide()
  $('.handlebar-oneShots').hide()
  $('.play-btn').on('click', playLoop)
  $('.stop-btn').on('click', stop)
  $('#Mr-Bill').on('click', () => onClickProducer('Mr-Bill'))
  $('#Oliver').on('click', () => onClickProducer('Oliver'))
  $('#Pascaal').on('click', () => onClickProducer('Pascaal'))
  $('#PointPoint').on('click', () => onClickProducer('PointPoint'))
  $('#Tennyson').on('click', () => onClickProducer('Tennyson'))
  $('#Torres-Rengifo').on('click', () => onClickProducer('Torres-Rengifo'))
  $('#Custom').on('click', () => onClickProducer('Custom'))
  $('#volume').on('change', onChangeVolume)
  $('#detune').on('change', onChangeDetune)

  changeKeyParams()

  $('.loops').on('change', onSelectLoop)
  $('#handlebar-uploads').on('change', '.custom-select', onSelectCustomLoop)
  $('#s-handlebar-oneShots').on('change', '.s-oneShot-select', onSelectCustomOneShotS)
  $('#s').on('click', () => kits[producer].s.play())
  $('#d').on('click', () => kits[producer].d.play())
  $('#f').on('click', () => kits[producer].f.play())
  $('#j').on('click', () => kits[producer].j.play())
  $('#k').on('click', () => kits[producer].k.play())
  $('#l').on('click', () => kits[producer].l.play())
  $('#oneShot-uploader').on('submit', uploadOneShot)
  $('#sound-uploader').on('submit', event => {
    event.preventDefault()
    $('.loader').show()
    // const file = $('#test-file').prop('files')[0]
    // console.log(file)
    // const formData = {
    //   file
    // }
    // const formFields = getFormFields(this)
    // console.log('form fields', formFields)
    const formData = new FormData(event.target)
    // console.log('event target isLoop', event.target.value)
    console.log('formData', formData.values())

    // let type = ''
    // if ($('#is-loop').prop('checked', true)) {
    //   type = 'loop'
    // } else if ($('#not-loop').prop('checked', true)) {
    //   type = 'not loop'
    // }

    $.ajax({
      method: 'POST',
      url: config.apiUrl + '/uploads',
      data: formData,
      contentType: false,
      processData: false
    })
      // .then(console.log)
      // .then(apiResponse => {
      //   $('#sound-display').html(`<audio controls src=${apiResponse.upload.url}></audio>`)
      // })
      .then(console.log)
      .then(indexAndShowUploads)
      .then(() => onClickProducer('Custom'))
      .then(() => $('.loader').hide())
      .catch(() => alert('failure'))
  })
  window.addEventListener('keydown', onkeyDown)
  window.addEventListener('keyup', onkeyUp)
}

module.exports = {
  addHandlers
}
