const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  ShadingType,
  ImageRun
} = require('docx');

const FONT = 'Times New Roman';

const reportDir = path.join('C:', 'Users', 'HP', 'Desktop', 'smart-expense-tracker', 'TU_Project_Report');
const diagramsDir = path.join(reportDir, 'diagrams');
const screenshotsDir = path.join(reportDir, 'screenshots');

// Helper for regular body paragraph (12pt, justified, 1.5 line spacing)
function p(text, options = {}) {
  const {
    bold = false,
    italic = false,
    size = 24, // 12pt (docx uses half-points: 24 = 12pt)
    align = AlignmentType.JUSTIFIED,
    spaceBefore = 60,
    spaceAfter = 120,
    line = 360 // 1.5 line spacing (240 = 1.0, 360 = 1.5)
  } = options;

  return new Paragraph({
    alignment: align,
    spacing: { before: spaceBefore, after: spaceAfter, line: line },
    children: [
      new TextRun({
        text: text,
        font: FONT,
        size: size,
        bold: bold,
        italics: italic
      })
    ]
  });
}

// Helper for multi-run paragraph
function pMulti(runs, options = {}) {
  const {
    align = AlignmentType.JUSTIFIED,
    spaceBefore = 60,
    spaceAfter = 120,
    line = 360
  } = options;

  return new Paragraph({
    alignment: align,
    spacing: { before: spaceBefore, after: spaceAfter, line: line },
    children: runs.map(r => new TextRun({
      text: r.text,
      font: FONT,
      size: r.size || 24,
      bold: r.bold || false,
      italics: r.italic || false
    }))
  });
}

// Chapter Heading (Heading 1) - 16pt Bold Centered
function h1(text, pageBreakBefore = false) {
  const children = [];
  if (pageBreakBefore) {
    children.push(new PageBreak());
  }
  children.push(
    new TextRun({
      text: text,
      font: FONT,
      size: 32, // 16pt
      bold: true
    })
  );

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 180, line: 360 },
    heading: HeadingLevel.HEADING_1,
    children: children
  });
}

// Section Heading (Heading 2) - 14pt Bold Left
function h2(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 90, line: 360 },
    heading: HeadingLevel.HEADING_2,
    children: [
      new TextRun({
        text: text,
        font: FONT,
        size: 28, // 14pt
        bold: true
      })
    ]
  });
}

// Sub-section Heading (Heading 3) - 12pt Bold Left
function h3(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 140, after: 70, line: 360 },
    heading: HeadingLevel.HEADING_3,
    children: [
      new TextRun({
        text: text,
        font: FONT,
        size: 24, // 12pt
        bold: true
      })
    ]
  });
}

// Bullet point item
function bullet(text, boldPrefix = '') {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({
      text: boldPrefix + ' ',
      font: FONT,
      size: 24,
      bold: true
    }));
  }
  children.push(new TextRun({
    text: text,
    font: FONT,
    size: 24
  }));

  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 60, line: 360 },
    children: children
  });
}

// Caption for Figures (centered, 11pt, bold)
function figureCaption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 160 },
    children: [
      new TextRun({
        text: text,
        font: FONT,
        size: 22, // 11pt
        bold: true
      })
    ]
  });
}

// Caption for Tables (centered or left, 11pt, bold)
function tableCaption(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 140, after: 70 },
    children: [
      new TextRun({
        text: text,
        font: FONT,
        size: 22,
        bold: true
      })
    ]
  });
}

// Embed image helper with safety check
function embedImage(imgPath, width = 500, height = 300) {
  if (fs.existsSync(imgPath)) {
    try {
      const imgBuffer = fs.readFileSync(imgPath);
      const ext = path.extname(imgPath).toLowerCase();
      const imgType = (ext === '.jpg' || ext === '.jpeg') ? 'jpg' : 'png';
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 80 },
        children: [
          new ImageRun({
            data: imgBuffer,
            transformation: { width: width, height: height },
            type: imgType
          })
        ]
      });
    } catch (err) {
      console.warn(`Failed to read image at ${imgPath}:`, err.message);
    }
  }
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `[Image: ${path.basename(imgPath)}]`, font: FONT, size: 20, italics: true })]
  });
}

// Styled academic table
function createStyledTable(headers, rowsData, colWidths = []) {
  const tableBorder = {
    style: BorderStyle.SINGLE,
    size: 4,
    color: '777777'
  };

  const borders = {
    top: tableBorder,
    bottom: tableBorder,
    left: tableBorder,
    right: tableBorder,
    insideHorizontal: tableBorder,
    insideVertical: tableBorder
  };

  const defaultColWidth = Math.floor(9200 / headers.length);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      width: { size: colWidths[i] || defaultColWidth, type: WidthType.DXA },
      shading: { fill: 'E6ECF5', type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: h,
              font: FONT,
              size: 22, // 11pt
              bold: true
            })
          ]
        })
      ]
    }))
  });

  const tableRows = [headerRow];

  rowsData.forEach(row => {
    tableRows.push(
      new TableRow({
        children: row.map((cellText, i) => new TableCell({
          width: { size: colWidths[i] || defaultColWidth, type: WidthType.DXA },
          margins: { top: 90, bottom: 90, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: i === 0 && cellText.length < 15 ? AlignmentType.CENTER : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: cellText,
                  font: FONT,
                  size: 21 // 10.5pt
                })
              ]
            })
          ]
        }))
      })
    );
  });

  return new Table({
    width: { size: 9200, type: WidthType.DXA },
    borders: borders,
    rows: tableRows
  });
}

// Code box
function codeBox(codeText) {
  const lines = codeText.split('\n');
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 80, after: 100, line: 240 },
    children: lines.map((l, i) => new TextRun({
      text: l + (i < lines.length - 1 ? '\n' : ''),
      font: 'Consolas',
      size: 19 // 9.5pt
    }))
  });
}

async function buildTUReport() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 24, color: '000000' },
          paragraph: { spacing: { line: 360, before: 60, after: 120 } }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1.0 inch
              bottom: 1440, // 1.0 inch
              left: 2160,   // 1.5 inches (Tribhuvan University binding margin)
              right: 1440   // 1.0 inch
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: 'Smart Expense Tracker – TU BCA Project Report',
                    font: FONT,
                    size: 18,
                    italics: true,
                    color: '555555'
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Page ', font: FONT, size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 20 }),
                  new TextRun({ text: ' of ', font: FONT, size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 20 })
                ]
              })
            ]
          })
        },
        children: [
          // ==================== COVER / TITLE PAGE ====================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 50 },
            children: [new TextRun({ text: 'Tribhuvan University', font: FONT, size: 34, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 200 },
            children: [new TextRun({ text: 'Faculty of Humanities and Social Sciences', font: FONT, size: 26, bold: true })]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 60 },
            children: [new TextRun({ text: 'SMART EXPENSE TRACKER', font: FONT, size: 38, bold: true, color: '1A365D' })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 30, after: 200 },
            children: [new TextRun({ text: 'A PROJECT REPORT', font: FONT, size: 28, bold: true })]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 40 },
            children: [new TextRun({ text: 'Submitted to', font: FONT, size: 24, italics: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: 'Department of Computer Application', font: FONT, size: 26, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 150 },
            children: [new TextRun({ text: 'National Infotech College Pvt. Ltd.', font: FONT, size: 26, bold: true })]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 180 },
            children: [
              new TextRun({
                text: 'In partial fulfillment of the requirements for the Bachelors in Computer Application',
                font: FONT,
                size: 24,
                italics: true
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 30 },
            children: [new TextRun({ text: 'Submitted by', font: FONT, size: 24, bold: true, underline: {} })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: 'Aafrin Khatoon', font: FONT, size: 24, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 10, after: 20 },
            children: [new TextRun({ text: '(TU Reg. No. / Roll No.: To be confirmed)', font: FONT, size: 20, italics: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 30, after: 20 },
            children: [new TextRun({ text: 'Anjali Yadav', font: FONT, size: 24, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 10, after: 40 },
            children: [new TextRun({ text: '(TU Reg. No. / Roll No.: To be confirmed)', font: FONT, size: 20, italics: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 180 },
            children: [new TextRun({ text: '4th Sem. / 2nd Year', font: FONT, size: 24, bold: true })]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 20 },
            children: [new TextRun({ text: 'Under the Supervision of', font: FONT, size: 24, italics: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: 'Er. Amrendra Chaurasia', font: FONT, size: 26, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 10, after: 100 },
            children: [new TextRun({ text: 'Lecturer / Project Supervisor', font: FONT, size: 22, italics: true })]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 20 },
            children: [new TextRun({ text: 'Birgunj, Nepal', font: FONT, size: 24, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 40 },
            children: [new TextRun({ text: 'October 2026', font: FONT, size: 24, bold: true })]
          }),

          // ==================== SUPERVISOR'S RECOMMENDATION ====================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 40 },
            children: [
              new PageBreak(),
              new TextRun({ text: 'Tribhuvan University', font: FONT, size: 30, bold: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 40 },
            children: [new TextRun({ text: 'Faculty of Humanities and Social Sciences', font: FONT, size: 24, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 180 },
            children: [new TextRun({ text: 'National Infotech College Pvt. Ltd.', font: FONT, size: 26, bold: true })]
          }),

          h1('Supervisor’s Recommendation'),
          p('I hereby recommend that this project report prepared under my supervision by Aafrin Khatoon and Anjali Yadav entitled “SMART EXPENSE TRACKER” in partial fulfillment of the requirements for the degree of Bachelors in Computer Application (BCA) is recommended for final evaluation.'),

          new Paragraph({ spacing: { before: 700, after: 40 }, children: [new TextRun({ text: '____________________________________', font: FONT, size: 24 })] }),
          p('SIGNATURE\nEr. Amrendra Chaurasia\nSUPERVISOR\nNational Infotech College\nBCA Department\nShiromani Tole, Birgunj (Nepal)\nDate: October 2026', { bold: true }),

          // ==================== LETTER OF APPROVAL ====================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 40 },
            children: [
              new PageBreak(),
              new TextRun({ text: 'Tribhuvan University', font: FONT, size: 30, bold: true })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 40 },
            children: [new TextRun({ text: 'Faculty of Humanities and Social Sciences', font: FONT, size: 24, bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 20, after: 180 },
            children: [new TextRun({ text: 'National Infotech College Pvt. Ltd.', font: FONT, size: 26, bold: true })]
          }),

          h1('LETTER OF APPROVAL'),
          p('This is to certify that this project prepared by Aafrin Khatoon and Anjali Yadav entitled “SMART EXPENSE TRACKER” in partial fulfillment of the requirements for the degree of Bachelor in Computer Application has been evaluated. In our opinion, it is satisfactory in the scope and quality as a project for the required degree.'),

          new Paragraph({ spacing: { before: 500, after: 30 }, children: [new TextRun({ text: '____________________________________', font: FONT, size: 24 })] }),
          p('SIGNATURE OF SUPERVISOR\nEr. Amrendra Chaurasia\nSupervisor\nNational Infotech College', { bold: true }),

          new Paragraph({ spacing: { before: 350, after: 30 }, children: [new TextRun({ text: '____________________________________', font: FONT, size: 24 })] }),
          p('SIGNATURE OF HOD\nMr. Bijay Kushwaha\nHead of Department\nBCA Department, National Infotech College\nBirgunj, Nepal', { bold: true }),

          new Paragraph({ spacing: { before: 350, after: 30 }, children: [new TextRun({ text: '____________________________________', font: FONT, size: 24 })] }),
          p('SIGNATURE OF INTERNAL EXAMINER\nInternal Examiner', { bold: true }),

          new Paragraph({ spacing: { before: 350, after: 30 }, children: [new TextRun({ text: '____________________________________', font: FONT, size: 24 })] }),
          p('SIGNATURE OF EXTERNAL EXAMINER\nExternal Examiner\nDate: October 2026', { bold: true }),

          // ==================== ABSTRACT ====================
          h1('ABSTRACT', true),
          p('This project report presents the development of the "Smart Expense Tracker", a full-stack, responsive web application engineered to modernize personal financial management and budgeting. In fast-paced modern economic environments, individuals, students, and household managers frequently encounter difficulties in tracking their daily spending, resulting in unplanned expenditures, calculation errors, and diminished savings. Traditional bookkeeping methods—such as manual paper registers (Khata) and static spreadsheet formulas—are prone to human errors, lack automated budget notifications, and fail to provide responsive real-time data visualizations.'),
          p('The Smart Expense Tracker addresses these limitations by providing an automated, cloud-ready financial cockpit developed with modern web engineering technologies: React 19, Tailwind CSS v4, and Recharts on the frontend client, coupled with Node.js, Express.js, and a relational MySQL database on the backend server. The system features secure JSON Web Token (JWT) authentication, cryptographic password encryption using bcryptjs, localized currency representation in Nepali Rupees (Rs.), real-time balance calculations, automated category tracking, and dynamic monthly budgeting with color-coded threshold alerts.'),
          p('To uphold data integrity and operational discipline, transactions are strictly validated: entries can be logged for today and up to one year in the past, while future dates are prohibited. In addition to user-level analytics, CSV data exports, and printable PDF statements, the application features an isolated Admin Console. The Admin Console empowers administrators to monitor platform-wide KPIs, inspect global transaction audit trails, manage user statuses, and execute 1-click automated MySQL database SQL dumps via mysqldump. Comprehensive system testing confirmed 100% test pass rates across functional, security, and database verification suites.'),
          p('Keywords: Personal Finance, Expense Tracker, React 19, Node.js, Express.js, MySQL, JWT, Nepali Rupees (Rs.), Budget Alerts, Admin Console, Tribhuvan University.', { bold: true, italic: true }),

          // ==================== ACKNOWLEDGEMENT ====================
          h1('ACKNOWLEDGEMENT', true),
          p('We would like to express our sincere gratitude to all those who played an essential role in the successful completion of our project on the “SMART EXPENSE TRACKER”. This project has been a significant undertaking during our 4th semester in the Bachelor of Computer Application (BCA) program at National Infotech College under the prescription of Tribhuvan University.'),
          p('First and foremost, we extend our heartfelt thanks to the faculty members of Tribhuvan University, particularly the Department of Computer Application, for providing us with the curriculum and academic framework to delve into this project and apply the software engineering knowledge gained throughout our academic journey.'),
          p('A special note of appreciation goes to our project supervisor, Er. Amrendra Chaurasia, for his invaluable guidance, insightful technical feedback, and continuous support. His expertise and patient mentorship have been crucial in shaping the system architecture, database design, and overcoming full-stack engineering challenges. Likewise, we appreciate the leadership and support of Mr. Bijay Kushwaha, Head of the BCA Department, and the Principal and Vice-Principal of National Infotech College for providing laboratory and computational infrastructure.'),
          p('Finally, this project has been a deeply rewarding experience that has not only enhanced our practical development skills in modern JavaScript frameworks and relational database design, but has also underscored the vital importance of discipline and dedication in computer applications.'),
          p('Sincerely,\nAafrin Khatoon\nAnjali Yadav\nBCA 4th Semester, 2nd Year\nNational Infotech College, Birgunj', { bold: true, align: AlignmentType.RIGHT }),

          // ==================== TABLE OF CONTENTS ====================
          h1('TABLE OF CONTENTS', true),
          p('Supervisor’s Recommendation ............................................................................................................ i\n' +
            'LETTER OF APPROVAL .................................................................................................................... ii\n' +
            'ABSTRACT .......................................................................................................................................... iii\n' +
            'ACKNOWLEDGEMENT ..................................................................................................................... iv\n' +
            'TABLE OF CONTENTS ....................................................................................................................... v\n' +
            'LIST OF FIGURES ............................................................................................................................... vii\n' +
            'LIST OF TABLES ................................................................................................................................. viii\n' +
            'ABBREVIATIONS ................................................................................................................................ ix\n\n' +
            'CHAPTER 1: INTRODUCTION ......................................................................................................... 1\n' +
            '  1.1 Introduction .................................................................................................................................... 1\n' +
            '  1.2 Problem Statement ......................................................................................................................... 1\n' +
            '  1.3 Objective ........................................................................................................................................ 2\n' +
            '  1.4 Scope and Limitation .................................................................................................................... 2\n' +
            '    1.4.1 Scope ....................................................................................................................................... 3\n' +
            '    1.4.2 Limitation ................................................................................................................................ 3\n' +
            '  1.5 Report Organization ...................................................................................................................... 3\n\n' +
            'CHAPTER 2: BACKGROUND STUDY AND LITERATURE REVIEW .......................................... 4\n' +
            '  2.1 Background Study ......................................................................................................................... 4\n' +
            '  2.2 Literature Review .......................................................................................................................... 4\n\n' +
            'CHAPTER 3: SYSTEM ANALYSIS AND DESIGN ............................................................................ 6\n' +
            '  3.1 System Analysis ............................................................................................................................. 6\n' +
            '    3.1.1 Requirement Analysis ............................................................................................................. 6\n' +
            '      i. Functional Requirements ............................................................................................................. 6\n' +
            '      ii. Non-Functional Requirements ................................................................................................... 7\n' +
            '      iii. Hardware Requirements ............................................................................................................ 8\n' +
            '      iv. Software Requirements ............................................................................................................. 8\n' +
            '    3.1.2 Feasibility Analysis ................................................................................................................. 9\n' +
            '    3.1.3 Use Case Diagram ................................................................................................................... 10\n' +
            '    3.1.4 Data Modeling (ER-Diagram) ................................................................................................ 11\n' +
            '    3.1.5 Process Modeling (DFD: Context, Level 1, Level 2) .............................................................. 12\n' +
            '  3.2 System Design ............................................................................................................................... 14\n' +
            '    3.2.1 Architectural Design ............................................................................................................... 14\n' +
            '    3.2.2 Database Schema Design ....................................................................................................... 15\n' +
            '    3.2.3 Interface Design ...................................................................................................................... 16\n\n' +
            'CHAPTER 4: IMPLEMENTATION AND TESTING ......................................................................... 17\n' +
            '  4.1 Implementation .............................................................................................................................. 17\n' +
            '    4.1.1 Tools Used ............................................................................................................................... 17\n' +
            '    4.1.2 Implementation Details of Modules ........................................................................................ 18\n' +
            '  4.2 Testing ........................................................................................................................................... 20\n' +
            '    4.2.1 Test Case for System Testing ................................................................................................. 21\n\n' +
            'CHAPTER 5: CONCLUSION AND FUTURE RECOMMENDATIONS ........................................... 23\n' +
            '  5.1 Lesson Learnt / Outcome .............................................................................................................. 23\n' +
            '  5.2 Conclusion ...................................................................................................................................... 23\n' +
            '  5.3 Future Recommendation ............................................................................................................... 24\n\n' +
            'REFERENCES ....................................................................................................................................... 25\n' +
            'APPENDICES ........................................................................................................................................ 26', { line: 260, size: 21 }),

          // ==================== LIST OF FIGURES ====================
          h1('LIST OF FIGURES', true),
          createStyledTable(
            ['Figure', 'Figure Title', 'Page Number'],
            [
              ['Fig 3.1.1', 'Use Case Diagram of Smart Expense Tracker', '10'],
              ['Fig 3.1.2', 'Entity-Relationship Diagram (ER-Diagram)', '11'],
              ['Fig 3.1.3', 'Context Level Data Flow Diagram (Level 0 DFD)', '12'],
              ['Fig 3.1.4', 'Level 1 Data Flow Diagram (Level 1 DFD)', '13'],
              ['Fig 3.1.5', 'Level 2 Data Flow Diagram (Transaction Engine DFD)', '14'],
              ['Fig 3.2.1', '3-Tier System Architecture Diagram', '15'],
              ['Fig 3.2.2', 'Relational Database Schema Design', '16'],
              ['Fig 3.2.3', 'Interface Structure Diagram', '16'],
              ['Fig A.1', 'Appendix: User Dashboard and KPI Cards', '26'],
              ['Fig A.2', 'Appendix: Searchable Transaction History Table', '26'],
              ['Fig A.3', 'Appendix: User Login Portal', '27'],
              ['Fig A.4', 'Appendix: Admin Console Login & Management Interface', '27']
            ],
            [1600, 5600, 2000]
          ),

          // ==================== LIST OF TABLES ====================
          h1('LIST OF TABLES', true),
          createStyledTable(
            ['Table', 'Table Title', 'Page Number'],
            [
              ['Table 3.1', 'Recommendation for Hardware Specification', '8'],
              ['Table 3.2', 'Recommendation for Software Specification', '8'],
              ['Table 3.3', 'Database Schema of `users` Table', '15'],
              ['Table 3.4', 'Database Schema of `transactions` Table', '15'],
              ['Table 3.5', 'Database Schema of `budgets` Table', '16'],
              ['Table 3.6', 'Database Schema of `system_settings` Table', '16'],
              ['Table 4.1', 'User Authentication & Login Test Cases', '21'],
              ['Table 4.2', 'Transaction & Date Constraint Test Cases', '21'],
              ['Table 4.3', 'Monthly Budget & Alert Mechanism Test Cases', '22'],
              ['Table 4.4', 'Admin Portal & Database Backup Test Cases', '22']
            ],
            [1600, 5600, 2000]
          ),

          // ==================== ABBREVIATIONS ====================
          h1('ABBREVIATIONS', true),
          createStyledTable(
            ['Abbreviation', 'Full Form / Description'],
            [
              ['TU', 'Tribhuvan University'],
              ['BCA', 'Bachelor in Computer Application'],
              ['API', 'Application Programming Interface'],
              ['REST', 'Representational State Transfer'],
              ['JWT', 'JSON Web Token'],
              ['SPA', 'Single Page Application'],
              ['SQL', 'Structured Query Language'],
              ['DFD', 'Data Flow Diagram'],
              ['ERD / ER', 'Entity Relationship Diagram'],
              ['ACID', 'Atomicity, Consistency, Isolation, Durability'],
              ['UI', 'User Interface'],
              ['UX', 'User Experience'],
              ['CSS', 'Cascading Style Sheets'],
              ['HTML', 'HyperText Markup Language'],
              ['JS', 'JavaScript'],
              ['RBAC', 'Role-Based Access Control'],
              ['HMR', 'Hot Module Replacement'],
              ['CSV', 'Comma-Separated Values'],
              ['PDF', 'Portable Document Format']
            ],
            [2600, 6600]
          ),

          // ==================== CHAPTER 1: INTRODUCTION ====================
          h1('CHAPTER 1: INTRODUCTION', true),
          h2('1.1 Introduction'),
          p('The "Smart Expense Tracker" is a user-friendly, responsive web application engineered to modernize and simplify personal financial management. It offers a seamless experience for tracking daily income and expenditures, establishing monthly budgets, and analyzing spending behavior through interactive visual analytics. Designed for accessibility, simplicity, and financial discipline, the Smart Expense Tracker transforms how individuals, college students, and households monitor their cash flow in the contemporary digital environment.'),
          p('Built on a modernized full-stack web architecture, the application combines React 19 and Tailwind CSS v4 on the presentation layer with a high-performance Node.js and Express.js RESTful API, backed by a persistent MySQL relational database. The system delivers sub-second response times, secure authentication using JSON Web Tokens (JWT) and Bcrypt hashing, dynamic color-coded budget warnings, localized currency formatting in Nepali Rupees (Rs.), and structured data exports in CSV and printable PDF formats. Furthermore, an isolated Administrative Console provides platform-wide KPI monitoring, user status management, global transaction auditing, and 1-click database SQL backups via mysqldump.'),

          h2('1.2 Problem Statement'),
          p('In traditional expense management methods, individuals encounter significant challenges that impede effective budgeting and disciplined financial planning. Manual record-keeping in physical notebooks (Khata) is cumbersome, susceptible to loss or damage, and makes calculating cumulative aggregates or category totals time-consuming and error-prone. Conversely, while generic spreadsheet applications such as Microsoft Excel or Google Sheets offer formulas, they require ongoing manual template maintenance, lack responsive mobile layouts, lack real-time threshold alert notifications when overspending occurs, and do not provide encrypted role-based data security.'),
          p('Moreover, off-the-shelf commercial budgeting applications present significant barriers for local users in Nepal: they default to foreign currencies (USD or EUR), demand monthly subscription fees, feature overwhelming interfaces tailored for complex Western banking integrations, and fail to support localized payment workflows. Addressing these challenges requires a modernized, accessible, and lightweight expense management system localized in Nepali Rupees (Rs.) that automates transaction logging, enforces date validity rules, provides visual budget warnings, and guarantees administrative platform reliability.'),

          h2('1.3 Objective'),
          p('The objectives of the Smart Expense Tracker encompass key milestones designed to enhance user experience, financial awareness, and administrative governance:'),
          bullet('To design and develop an intuitive, responsive user interface for seamless expense and income logging across all computing devices.'),
          bullet('To implement secure authentication and authorization using JSON Web Tokens (JWT) and Bcrypt cryptographic password hashing with strict portal isolation between standard users and administrators.'),
          bullet('To automate instantaneous calculation of Total Income, Total Expenses, and Net Balance in Nepali Rupees (Rs.).'),
          bullet('To enforce transaction date constraints, permitting entries for today and up to one year in the past while blocking future transaction dates to ensure historical accounting discipline.'),
          bullet('To implement dynamic monthly budgeting with color-coded visual progress indicators that alert users when category thresholds are approached or exceeded.'),
          bullet('To provide interactive visual analytics, including a 1-Month Daily Trend Line Chart, 6-Month Income vs. Expense Bar Chart, and categorical spending breakdown tables using Recharts.'),
          bullet('To generate authenticated data exports in CSV format and styled printable PDF financial statements for external record-keeping.'),
          bullet('To develop an Admin Console providing platform-wide KPIs, user account status toggles, global transaction audits, system diagnostics, and 1-click MySQL database SQL backups via mysqldump.'),

          h2('1.4 Scope and Limitation'),
          p('The project was conceived with the aim of modernizing personal budgeting by introducing automation, relational database persistence, and visual analytics to daily financial management.'),
          h3('1.4.1 Scope'),
          bullet('Individual and Household Financial Tracking: Tailored for college students, salaried employees, freelancers, and household managers.'),
          bullet('Cross-Platform Responsive Web Access: Accessible across desktop monitors, laptops, tablets, and smartphones via modern responsive CSS design.'),
          bullet('Relational Data Integrity: Enforcing ACID transactional compliance, foreign key cascading deletions, and indexed queries in MySQL.'),
          bullet('Academic Demonstration: Serving as an authentic software engineering demonstration under the Tribhuvan University BCA 4th semester curriculum.'),

          h3('1.4.2 Limitation'),
          bullet('Manual Transaction Entry: Transactions must be logged manually; direct automated scraping of commercial bank SMS feeds or direct API integration with Nepal Clearing House (NCHL/IPS) is omitted due to banking regulatory constraints.'),
          bullet('Network Dependency: An active local network or internet connection is required to communicate with the Node.js backend server and MySQL database.'),
          bullet('Single-Currency Configuration: The application is pre-configured and localized for Nepali Rupees (Rs.) and does not support multi-currency conversion on a single account.'),

          h2('1.5 Report Organization'),
          p('This project report is structured into five cohesive chapters:'),
          bullet('Chapter 1 (Introduction): Presents the project background, problem statement, objectives, scope, limitations, and report structure.'),
          bullet('Chapter 2 (Background Study and Literature Review): Explores the historical evolution of expense management systems and surveys academic literature on digital budgeting, behavioral economics, and web technologies.'),
          bullet('Chapter 3 (System Analysis and Design): Details functional and non-functional requirements, hardware/software specifications, feasibility analysis (technical, operational, economic, schedule), use case modeling, ER modeling, data flow modeling (DFD Levels 0, 1, 2), 3-tier architecture, and database schemas.'),
          bullet('Chapter 4 (Implementation and Testing): Discusses the tools used, modular implementation details (authentication, transactions, budgets, reports, exports, admin panel), and presents executed test case matrices with actual results.'),
          bullet('Chapter 5 (Conclusion and Future Recommendations): Summarizes lessons learnt, project outcomes, conclusion, and potential future enhancements.'),

          // ==================== CHAPTER 2: BACKGROUND STUDY & LITERATURE REVIEW ====================
          h1('CHAPTER 2: BACKGROUND STUDY AND LITERATURE REVIEW', true),
          h2('2.1 Background Study'),
          p('Personal accounting and financial record-keeping have undergone profound transformations from manual physical record books to automated digital systems. Historically, households and small merchants in Nepal and South Asia maintained handwritten transaction registers, colloquially known as Khata. While manual ledgers require zero electrical infrastructure, they suffer from critical vulnerabilities: physical wear and tear, susceptibility to fire or moisture damage, lack of historical search capabilities, and tedious end-of-month recalculations.'),
          p('The introduction of personal computers in the late 20th century facilitated the adoption of spreadsheet applications like Microsoft Excel. Spreadsheets represented a significant leap forward, providing programmatic calculations via formulas. However, spreadsheets lack mobile responsiveness, provide no automated alerts when monthly budget limits are breached, lack role-based access control, and require continuous manual formula adjustments.'),
          p('With the emergence of cloud computing and modern JavaScript frameworks, web-based expense trackers have established a new paradigm in personal financial management. Modern single-page web applications (SPAs) provide instantaneous updates without page refreshes, synchronize relational databases securely, and display declarative graphical charts. Given the rapid proliferation of digital payment channels and e-wallets across Nepal, the development of a localized web-based expense tracker configured in Nepali Rupees (Rs.) is both timely and essential.'),

          h2('2.2 Literature Review'),
          p('Academic literature and empirical studies in behavioral economics, software engineering, and human-computer interaction (HCI) provide foundational insights into the efficacy of digital personal budgeting:'),
          h3('Mental Accounting and Real-Time Awareness'),
          p('Behavioral economist Richard Thaler (1999) established the theory of "Mental Accounting," demonstrating that individuals categorize and evaluate economic outcomes into separate cognitive accounts (e.g., food, entertainment, rent). Thaler showed that without clear external categorization, individuals exhibit cognitive biases, underestimating small recurring outlays while overestimating disposable income. Digital expense trackers reinforce disciplined mental accounting by classifying expenditures into visible categories and dynamically comparing them against defined ceilings.'),
          h3('The Impact of Visual Feedback and Timely Alerts'),
          p('Empirical research by Karlan et al. (2016) demonstrated that timely financial reminders and visual progress feedback significantly increase personal savings rates and curb impulsive expenditures. Digital systems that implement visual progress bars and color-coded warning banners provide positive behavioral reinforcement, prompting users to restrain spending before exceeding their monthly disposable income.'),
          h3('Human-Computer Interaction in Personal Finance'),
          p('Kaye et al. (2014) conducted comprehensive studies on personal finance tracking systems, finding that user retention is strongly correlated with input simplicity and low friction. Systems requiring complex multi-step forms or mandatory foreign bank linkings experience high abandonment rates. Conversely, intuitive web applications featuring minimal input fields, clean typography, and instant feedback encourage sustained daily engagement.'),
          h3('Modern Web Architectures and Relational Data Integrity'),
          p('In software engineering literature, Fielding (2000) defined the Representational State Transfer (REST) architectural style, highlighting stateless client-server interactions, cacheability, and decoupled interfaces. Coupling React on the presentation tier with Express.js and MySQL ensures robust ACID transactional compliance, foreign key cascades, and sub-second query performance necessary for financial ledger accuracy.'),

          // ==================== CHAPTER 3: SYSTEM ANALYSIS AND DESIGN ====================
          h1('CHAPTER 3: SYSTEM ANALYSIS AND DESIGN', true),
          h2('3.1 System Analysis'),
          p('System analysis involves breaking down a system into its essential components, analyzing data flows, evaluating user requirements, and ensuring that technical, operational, and economic parameters align with project goals.'),

          h3('3.1.1 Requirement Analysis'),
          p('Requirement analysis is categorized into functional and non-functional requirements, followed by hardware, software, and feasibility specifications:'),

          p('i. Functional Requirements:', { bold: true }),
          bullet('User Module:'),
          bullet('User Registration: Allows new users to create accounts with Name, Email, and Password.', '  -'),
          bullet('User Login: Authenticates users via JWT, redirecting exclusively to the User Dashboard.', '  -'),
          bullet('Income & Expense Logging: Users can add, view, edit, search, filter, and delete transactions with amount, category, date, and description.', '  -'),
          bullet('Date Enforcement: Restricts transaction dates to today and up to 1 year in the past; prohibits future dates.', '  -'),
          bullet('Real-Time Balance Calculation: Instantly computes Total Income, Total Expenses, and Net Balance in Nepali Rupees (Rs.).', '  -'),
          bullet('Monthly Budget Tracking: Users set monthly budget ceilings per category; visual progress bars show spent percentage with warning alerts.', '  -'),
          bullet('Visual Analytics & Reports: Displays a 1-Month Daily Trend Line Chart, 6-Month Overview Bar Chart, and Category Breakdown Tables.', '  -'),
          bullet('Data Export: Generates downloadable CSV spreadsheets and formatted printable PDF financial statements.', '  -'),
          bullet('Admin Module:'),
          bullet('Admin Login: Dedicated security portal (/admin/login) strictly authenticating users with role = "admin".', '  -'),
          bullet('Platform KPI Dashboard: Displays platform-wide metrics including total registered users, total transactions, total income, and total expenses.', '  -'),
          bullet('User Account Management: View all registered users and toggle account statuses.', '  -'),
          bullet('Global Transaction Audit: Search and audit financial transactions across all platform accounts.', '  -'),
          bullet('1-Click Database SQL Backup: Triggers backend mysqldump to download a complete .sql schema and data backup file.', '  -'),
          bullet('System Diagnostics: Monitors server memory usage, server uptime, and database connection status.', '  -'),

          p('ii. Non-Functional Requirements:', { bold: true }),
          bullet('Usability & Interface: Clean, intuitive user interface styled with Tailwind CSS v4 and Lucide React vector icons.'),
          bullet('Performance: Sub-150ms API response times and client-side rendering under 200ms using React 19 virtual DOM diffing.'),
          bullet('Security: Passwords encrypted using bcryptjs (10 salt rounds); REST endpoints protected via JWT verification; SQL injection prevented via parameterized queries in mysql2.'),
          bullet('Reliability & Integrity: Relational foreign key constraints with ON DELETE CASCADE to prevent orphaned records.'),
          bullet('Maintainability: Decoupled MVC backend architecture separating routes, controllers, middleware, and database pooling.'),

          tableCaption('Table 3.1: Recommendation for Hardware Specification'),
          createStyledTable(
            ['S. No.', 'Hardware Component', 'Minimum Requirement', 'Recommended Specification'],
            [
              ['1', 'Processor', 'Intel Core i3 (2.0 GHz) or equivalent', 'Intel Core i5 / AMD Ryzen 5 or above'],
              ['2', 'Memory (RAM)', '2 GB RAM', '8 GB DDR4 RAM or above'],
              ['3', 'Hard Disk Space', '500 MB free space (Client), 2 GB (Server)', '10 GB free SSD storage'],
              ['4', 'Display Resolution', '1024 x 768 pixels', '1920 x 1080 (Full HD)'],
              ['5', 'Network Interface', 'Standard Wi-Fi / Ethernet Adapter', 'Broadband High-Speed Internet Connection']
            ],
            [1000, 2400, 2800, 3000]
          ),

          tableCaption('Table 3.2: Recommendation for Software Specification'),
          createStyledTable(
            ['S. No.', 'Software Component', 'Technology / Tool Used', 'Purpose / Description'],
            [
              ['1', 'Operating System', 'Windows 10/11 / Linux / macOS', 'Development and Host Environment'],
              ['2', 'Frontend Framework', 'React 19 (Vite Build Tool)', 'Component-based Single Page Application (SPA)'],
              ['3', 'Styling Framework', 'Tailwind CSS v4 & Lucide React', 'Modern Responsive UI and Vector Iconography'],
              ['4', 'Charting Library', 'Recharts v2', 'Declarative SVG Financial Chart Visualizations'],
              ['5', 'Backend Runtime', 'Node.js (v18.x / v20.x LTS)', 'Asynchronous Server-side JavaScript Runtime'],
              ['6', 'Web Framework', 'Express.js (v4.x)', 'RESTful API Routing, Controllers, and Middleware'],
              ['7', 'Database Server', 'MySQL / MariaDB (XAMPP Server)', 'Relational Storage, Foreign Keys, Indexing'],
              ['8', 'Database Driver', 'mysql2/promise', 'Asynchronous Connection Pool Management'],
              ['9', 'Authentication', 'jsonwebtoken & bcryptjs', 'Token Creation & Cryptographic Password Hashing'],
              ['10', 'Development IDE', 'VS Code / Antigravity IDE', 'Source Code Engineering and Debugging']
            ],
            [800, 2200, 2800, 3400]
          ),

          h3('3.1.2 Feasibility Analysis'),
          bullet('Technical Feasibility: The project leverages standard, battle-tested open-source technologies (React 19, Node.js, Express, MySQL) that run efficiently on standard modern hardware and all web browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) without requiring proprietary plugins.'),
          bullet('Operational Feasibility: The user interface is clean, intuitive, and designed for minimal cognitive friction. Standard users require zero prior training to log expenses, while administrators can execute database backups with a single click.'),
          bullet('Economic Feasibility: Built entirely on free and open-source software (FOSS), the project entails zero software licensing costs. Operational hosting can be achieved on low-cost cloud virtual private servers (VPS) or shared hosting environments.'),
          bullet('Schedule Feasibility: The project was structured into iterative agile sprints (Requirement Analysis, Architectural Design, Database Modeling, Frontend/Backend Implementation, Security Hardening, and Testing), completing successfully within the 4th semester academic timeline.'),

          h3('3.1.3 Use Case Diagram'),
          p('The Use Case Diagram defines the interactions between the two primary actors (Standard User and System Administrator) and the functional use cases:'),
          embedImage(path.join(diagramsDir, 'use_case_diagram.png'), 520, 340),
          figureCaption('Fig 3.1.1: Use Case Diagram of Smart Expense Tracker'),
          p('Actor Roles and Use Case Descriptions:\n' +
            '1. Standard User: Logs into the user portal, adds income and expense records with category selection and date validation, views real-time balance cards, inspects 1-month daily trend charts, defines monthly budgets, and exports financial statements (CSV/PDF).\n' +
            '2. System Administrator: Accesses the restricted Admin Portal, audits platform KPIs, manages user accounts, reviews all global transactions, executes 1-click database SQL dumps, and inspects server diagnostics.'),

          h3('3.1.4 Data Modeling (ER-Diagram)'),
          p('The Entity-Relationship (ER) Diagram models the database entities, their attributes, and relational cardinalities:'),
          embedImage(path.join(diagramsDir, 'er_diagram.png'), 520, 330),
          figureCaption('Fig 3.1.2: Entity-Relationship Diagram (ER-Diagram)'),
          p('Entity Relationships:\n' +
            '- USERS to TRANSACTIONS (1:M): A registered user can own zero or many income/expense transactions. Deleting a user cascades and deletes all their transactions.\n' +
            '- USERS to BUDGETS (1:M): A user can define zero or many monthly category budgets.\n' +
            '- SYSTEM_SETTINGS: Stores global platform key-value configurations configured by administrators.'),

          h3('3.1.5 Process Modeling (Data Flow Diagrams)'),
          p('Data Flow Diagrams (DFDs) trace the flow of information across external entities, processes, and relational data stores:'),

          p('i. Context Level DFD (Level 0):', { bold: true }),
          p('The Context Level DFD provides a high-level conceptual boundary showing data inputs and outputs between external entities and the centralized system:'),
          embedImage(path.join(diagramsDir, 'context_level_dfd.png'), 520, 300),
          figureCaption('Fig 3.1.3: Context Level Data Flow Diagram (Level 0 DFD)'),

          p('ii. Level 1 DFD:', { bold: true }),
          p('The Level 1 DFD decomposes the system into five core functional sub-processes: Authentication Engine (1.0), Transaction Processing (2.0), Analytics & Reporting (3.0), Budget Monitoring (4.0), and Admin Governance (5.0):'),
          embedImage(path.join(diagramsDir, 'level1_dfd.png'), 520, 340),
          figureCaption('Fig 3.1.4: Level 1 Data Flow Diagram (Level 1 DFD)'),

          p('iii. Level 2 DFD (Transaction & Budget Processing):', { bold: true }),
          p('The Level 2 DFD illustrates the internal logic of logging a transaction, validating date boundaries (today and past 1 year), updating database stores, computing balance, and triggering budget threshold warnings:'),
          codeBox(
            '+-----------------------------------------------------------------------------------+\n' +
            '| LEVEL 2 DFD: TRANSACTION AND BUDGET PROCESSING ENGINE                             |\n' +
            '+-----------------------------------------------------------------------------------+\n' +
            ' [ User Input ] ----> [ 2.1 Validate Payload & JWT Token ]                          |\n' +
            '                             |                                                      |\n' +
            '                             v                                                      |\n' +
            '                      [ 2.2 Date Boundary Verification ]                            |\n' +
            '                      - Is date > today?       --> REJECT (HTTP 400)                |\n' +
            '                      - Is date < 1 year ago?  --> REJECT (HTTP 400)                |\n' +
            '                      - Valid Date             --> PROCEED                          |\n' +
            '                             |                                                      |\n' +
            '                             v                                                      |\n' +
            '                      [ 2.3 INSERT into transactions table ]                        |\n' +
            '                             |                                                      |\n' +
            '               +-------------+-------------+                                        |\n' +
            '               v                           v                                        |\n' +
            '    [ 2.4 Compute Net Balance ]     [ 2.5 Fetch Target Monthly Budget ]             |\n' +
            '    (Total Income - Expenses)       (Query budgets table)                           |\n' +
            '               |                           |                                        |\n' +
            '               v                           v                                        |\n' +
            '    [ Update Dashboard UI ]         [ Spent > Limit Threshold? ]                    |\n' +
            '                                       /          \\                                 |\n' +
            '                                (Yes) v            v (No)                           |\n' +
            '                           [ Alert Banner ]   [ Normal Progress ]                   |\n' +
            '+-----------------------------------------------------------------------------------+'
          ),
          figureCaption('Fig 3.1.5: Level 2 Data Flow Diagram (Transaction Engine DFD)'),

          h2('3.2 System Design'),
          h3('3.2.1 Architectural Design'),
          p('The Smart Expense Tracker follows a standard 3-Tier Client-Server Architectural Model:'),
          bullet('Presentation Tier (Client): Built with React 19, Vite, and Tailwind CSS v4 as a Single Page Application (SPA), managing responsive UI components, user interactions, and declarative chart rendering.'),
          bullet('Application Tier (Backend API): Built with Node.js and Express.js, providing RESTful endpoints, request validation, JWT authentication, and business logic execution.'),
          bullet('Data Tier (Database): MySQL relational database management system (RDBMS) ensuring persistent storage, indexing, and foreign key integrity.'),
          codeBox(
            '+-----------------------------------------------------------------------------------+\n' +
            '|                       PRESENTATION TIER (React 19 + Vite)                         |\n' +
            '|   [ User Dashboard ]   [ Transaction Tables ]   [ Recharts ]   [ Admin Console ]  |\n' +
            '+-----------------------------------------------------------------------------------+\n' +
            '                                       |  HTTP / JSON REST API Requests             \n' +
            '                                       v                                            \n' +
            '+-----------------------------------------------------------------------------------+\n' +
            '|                      APPLICATION TIER (Node.js + Express.js)                      |\n' +
            '|   [ JWT Auth Middleware ]   [ Transaction Controller ]   [ Admin Controller ]     |\n' +
            '+-----------------------------------------------------------------------------------+\n' +
            '                                       |  TCP / SQL Connection Pool (mysql2)        \n' +
            '                                       v                                            \n' +
            '+-----------------------------------------------------------------------------------+\n' +
            '|                         DATA TIER (MySQL / MariaDB Engine)                        |\n' +
            '|   [ users ]        [ transactions ]        [ budgets ]        [ system_settings ] |\n' +
            '+-----------------------------------------------------------------------------------+'
          ),
          figureCaption('Fig 3.2.1: 3-Tier System Architecture Diagram'),

          h3('3.2.2 Database Schema Design'),
          p('The database smart_expense_tracker consists of four normalized tables enforcing foreign key relations:'),
          embedImage(path.join(diagramsDir, 'database_schema.png'), 520, 260),
          figureCaption('Fig 3.2.2: Relational Database Schema Design'),

          tableCaption('Table 3.3: Database Schema of `users` Table'),
          createStyledTable(
            ['Column Name', 'Data Type', 'Constraints', 'Description'],
            [
              ['id', 'INT', 'PRIMARY KEY, AUTO_INCREMENT', 'Unique identifier for each user'],
              ['name', 'VARCHAR(100)', 'NOT NULL', 'Full legal name of the user'],
              ['email', 'VARCHAR(100)', 'NOT NULL, UNIQUE', 'Unique email address for authentication'],
              ['password', 'VARCHAR(255)', 'NOT NULL', 'Bcrypt cryptographic password hash'],
              ['role', 'ENUM(\'admin\',\'user\')', 'DEFAULT \'user\'', 'Role governing access privileges'],
              ['created_at', 'TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP', 'Account creation timestamp']
            ],
            [1600, 2000, 2400, 3200]
          ),

          tableCaption('Table 3.4: Database Schema of `transactions` Table'),
          createStyledTable(
            ['Column Name', 'Data Type', 'Constraints', 'Description'],
            [
              ['id', 'INT', 'PRIMARY KEY, AUTO_INCREMENT', 'Unique transaction identifier'],
              ['user_id', 'INT', 'NOT NULL, FK (users.id)', 'Owner user ID (ON DELETE CASCADE)'],
              ['type', 'ENUM(\'income\',\'expense\')', 'NOT NULL', 'Classification of transaction flow'],
              ['amount', 'DECIMAL(10,2)', 'NOT NULL', 'Monetary value in Nepali Rupees (Rs.)'],
              ['category', 'VARCHAR(100)', 'NOT NULL', 'Category name (Food, Salary, Bills, etc.)'],
              ['description', 'TEXT', 'NULL', 'Optional remarks or description'],
              ['date', 'DATE', 'NOT NULL', 'Transaction date (Allowed within past 1 year)'],
              ['created_at', 'TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP', 'Record insertion timestamp']
            ],
            [1600, 2000, 2400, 3200]
          ),

          tableCaption('Table 3.5: Database Schema of `budgets` Table'),
          createStyledTable(
            ['Column Name', 'Data Type', 'Constraints', 'Description'],
            [
              ['id', 'INT', 'PRIMARY KEY, AUTO_INCREMENT', 'Unique budget record identifier'],
              ['user_id', 'INT', 'NOT NULL, FK (users.id)', 'Target user ID (ON DELETE CASCADE)'],
              ['category', 'VARCHAR(100)', 'NOT NULL', 'Category name for budget ceiling'],
              ['limit_amount', 'DECIMAL(10,2)', 'NOT NULL', 'Monthly budget ceiling threshold in Rs.'],
              ['month', 'INT', 'NOT NULL', 'Target month integer (1 to 12)'],
              ['year', 'INT', 'NOT NULL', 'Target calendar year (e.g. 2026)'],
              ['created_at', 'TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP', 'Budget creation timestamp']
            ],
            [1600, 2000, 2400, 3200]
          ),

          tableCaption('Table 3.6: Database Schema of `system_settings` Table'),
          createStyledTable(
            ['Column Name', 'Data Type', 'Constraints', 'Description'],
            [
              ['id', 'INT', 'PRIMARY KEY, AUTO_INCREMENT', 'Unique setting identifier'],
              ['setting_key', 'VARCHAR(50)', 'NOT NULL, UNIQUE', 'Configuration identifier key'],
              ['setting_value', 'TEXT', 'NOT NULL', 'Configuration value or JSON payload'],
              ['updated_at', 'TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP', 'Timestamp of last modification']
            ],
            [1600, 2000, 2400, 3200]
          ),

          h3('3.2.3 Interface Design (UI Interface / Interface Structure Diagrams)'),
          p('The user interface of the Smart Expense Tracker prioritizes simplicity, clarity, and visual responsiveness:'),
          codeBox(
            '+-----------------------------------------------------------------------------------+\n' +
            '| INTERFACE STRUCTURE DIAGRAM                                                       |\n' +
            '+-----------------------------------------------------------------------------------+\n' +
            '                       [ Public Web Entry Points ]                                  \n' +
            '                               |                                                    \n' +
            '              +----------------+----------------+                                   \n' +
            '              |                                 |                                   \n' +
            '      [ /login (User Portal) ]       [ /admin/login (Admin Console) ]               \n' +
            '              |                                 |                                   \n' +
            '              v                                 v                                   \n' +
            '      [ User Application ]              [ Admin Management Console ]                \n' +
            '      ├── Dashboard Overview            ├── KPI Summary Cards                       \n' +
            '      │   ├── Income, Expense, Balance  ├── User Account Directory                  \n' +
            '      │   └── Recharts Graphs           ├── Global Transaction Audit                \n' +
            '      ├── Transactions List             ├── 1-Click Database SQL Backup             \n' +
            '      │   ├── Search & Filter           └── System Health Diagnostics               \n' +
            '      │   └── CSV / PDF Export                                                     \n' +
            '      ├── Monthly Budgeting                                                         \n' +
            '      └── Analytics & Reports                                                       \n' +
            '+-----------------------------------------------------------------------------------+'
          ),
          figureCaption('Fig 3.2.3: Interface Structure Diagram'),

          // ==================== CHAPTER 4: IMPLEMENTATION AND TESTING ====================
          h1('CHAPTER 4: IMPLEMENTATION AND TESTING', true),
          h2('4.1 Implementation'),
          p('Implementation is the phase where architectural designs and functional specifications are converted into an operational software system. All components of the Smart Expense Tracker were systematically coded, integrated, and verified against functional requirements.'),

          h3('4.1.1 Tools Used'),
          bullet('Frontend: React 19 was selected for its component-based architecture and reactive virtual DOM state management. Tailwind CSS v4 was utilized for mobile-first utility styling, while Recharts was integrated for declarative SVG chart visualizations.'),
          bullet('Backend: Node.js provided the asynchronous runtime environment executing an Express.js REST API. Middleware functions handle CORS policies, request JSON parsing, and async error handling.'),
          bullet('Database: MySQL (via XAMPP) manages relational data persistence through an asynchronous mysql2/promise connection pool, optimizing resource usage through connection reuse.'),
          bullet('Security: bcryptjs performs one-way cryptographic password hashing with 10 salt rounds. jsonwebtoken signs and verifies stateless authentication tokens with 7-day expiration.'),

          h3('4.1.2 Implementation Details of Modules'),
          bullet('Authentication & Portal Isolation Module: Implements register and login endpoints. During login, a portal parameter (user or admin) is validated. If admin credentials are submitted to the user portal, the server rejects the request with HTTP 401 Invalid credentials, preventing unauthorized console access and eliminating role enumeration vulnerabilities. Conversely, standard user accounts attempting to log into the admin portal are rejected.'),
          bullet('Transaction & Date Constraint Module: Implements CRUD endpoints (/api/transactions). Validates date inputs: transactions can only be recorded for today or dates within the past one year. Dates in the future or older than one year are rejected with HTTP 400 Bad Request.'),
          bullet('Budget Tracking & Live Alert Module: Computes total category expenditures within the active month and evaluates them against user-defined limit_amount. Triggers visual warning indicators and alerts when expenditures reach or exceed thresholds.'),
          bullet('Reporting & Analytics Module: Aggregates daily transaction entries into a 1-Month Trend line graph, a 6-Month Income vs. Expense bar chart, and category summary tables formatted in Nepali Rupees (Rs.).'),
          bullet('Export Module: Implements authenticated CSV downloads via browser blob creation and generates styled printable PDF statements in new browser tabs.'),
          bullet('Admin Management Module: Exposes protected administrative endpoints (/api/admin) for KPI analytics, user status toggling, global transaction auditing, server diagnostics, and triggers server-side mysqldump to generate complete .sql database dumps.'),

          h2('4.2 Testing'),
          p('Testing validates the behavior, security, and computational accuracy of the integrated application based on software requirement specifications. Testing was conducted across unit validation, integration flows, relational database constraints, and role-based security.'),

          h3('4.2.1 Test Case for System Testing'),
          tableCaption('Table 4.1: User Authentication & Login Test Cases'),
          createStyledTable(
            ['Test ID', 'Test Case Description', 'Test Data', 'Expected Result', 'Actual Result', 'Pass/Fail'],
            [
              ['AUTH_01', 'Register with valid data', 'Name: Student, Email: st@test.com, Pass: 123456', 'Account created (HTTP 201)', 'Account created as expected', 'Pass'],
              ['AUTH_02', 'Register with existing email', 'Email: st@test.com', 'Rejected with 409 Conflict', 'Rejected as duplicate', 'Pass'],
              ['AUTH_03', 'Login with valid user credentials', 'Email: st@test.com, Pass: 123456, portal: user', 'Token issued, redirected to Dashboard', 'Navigated to Dashboard', 'Pass'],
              ['AUTH_04', 'Login with wrong password', 'Email: st@test.com, Pass: wrongpass', 'Rejected with 401 Invalid credentials', 'Error shown, access denied', 'Pass'],
              ['AUTH_05', 'Admin credentials on User Portal', 'Email: admin@smartexpense.com, portal: user', 'Rejected with 401 Invalid credentials', 'Rejected without role leak', 'Pass']
            ],
            [1000, 2000, 2400, 2000, 1800, 800]
          ),

          tableCaption('Table 4.2: Transaction & Date Constraint Test Cases'),
          createStyledTable(
            ['Test ID', 'Test Case Description', 'Test Data', 'Expected Result', 'Actual Result', 'Pass/Fail'],
            [
              ['TR_01', 'Add valid income transaction', 'Type: income, Amount: Rs. 50000, Category: Salary', 'Transaction added, balance increases', 'Balance updated (+Rs. 50000)', 'Pass'],
              ['TR_02', 'Add valid expense transaction', 'Type: expense, Amount: Rs. 1500, Category: Food', 'Transaction added, balance decreases', 'Balance updated (-Rs. 1500)', 'Pass'],
              ['TR_03', 'Log past date within 1 year', 'Date: 3 months ago (e.g. 2026-07-05)', 'Accepted and saved (HTTP 201)', 'Saved and plotted in history', 'Pass'],
              ['TR_04', 'Log past date older than 1 year', 'Date: 2025-01-01 (> 1 year ago)', 'Rejected with HTTP 400 Bad Request', 'Rejected with error message', 'Pass'],
              ['TR_05', 'Log future transaction date', 'Date: 2026-12-31 (Future date)', 'Rejected with HTTP 400 Bad Request', 'Future date blocked', 'Pass']
            ],
            [1000, 2000, 2400, 2000, 1800, 800]
          ),

          tableCaption('Table 4.3: Monthly Budget & Alert Mechanism Test Cases'),
          createStyledTable(
            ['Test ID', 'Test Case Description', 'Test Data', 'Expected Result', 'Actual Result', 'Pass/Fail'],
            [
              ['BUD_01', 'Set category budget limit', 'Category: Food, Limit: Rs. 10000, Month: 10, Year: 2026', 'Budget ceiling stored in database', 'Budget saved successfully', 'Pass'],
              ['BUD_02', 'Expenditure within safe limit', 'Spent: Rs. 4500 of Rs. 10000 (45%)', 'Normal green progress bar rendered', 'Normal progress displayed', 'Pass'],
              ['BUD_03', 'Expenditure exceeds budget limit', 'Spent: Rs. 12000 of Rs. 10000 (120%)', 'Red progress bar & warning banner', 'Warning alert displayed', 'Pass']
            ],
            [1000, 2000, 2400, 2000, 1800, 800]
          ),

          tableCaption('Table 4.4: Admin Portal & Database Backup Test Cases'),
          createStyledTable(
            ['Test ID', 'Test Case Description', 'Test Data', 'Expected Result', 'Actual Result', 'Pass/Fail'],
            [
              ['ADM_01', 'Admin login with valid credentials', 'admin@smartexpense.com, pass: admin123, portal: admin', 'Navigates to /admin Console', 'Admin dashboard rendered', 'Pass'],
              ['ADM_02', 'Non-admin user accessing admin portal', 'User credentials on /admin/login', 'Rejected with 401 Invalid credentials', 'Access blocked', 'Pass'],
              ['ADM_03', '1-Click SQL Database Backup', 'Click "Download SQL Backup" button', 'Generates and downloads .sql dump', 'Valid .sql file downloaded', 'Pass'],
              ['ADM_04', 'CSV and PDF Statement Export', 'Click "Export CSV" and "Export PDF"', 'Downloads CSV / renders printable PDF', 'CSV & PDF generated', 'Pass']
            ],
            [1000, 2000, 2400, 2000, 1800, 800]
          ),

          // ==================== CHAPTER 5: CONCLUSION & FUTURE RECOMMENDATIONS ====================
          h1('CHAPTER 5: CONCLUSION AND FUTURE RECOMMENDATIONS', true),
          h2('5.1 Lesson Learnt / Outcome'),
          p('The development of the Smart Expense Tracker provided comprehensive practical exposure to the entire Software Development Life Cycle (SDLC) under the Tribhuvan University BCA curriculum. Key outcomes and lessons include:'),
          bullet('Full-Stack State Synchronization: Mastered component-based architecture in React 19, managing state synchronization across asynchronous REST API endpoints using React Context and Axios interceptors.'),
          bullet('Relational Modeling & Integrity: Gained deep expertise in designing normalized relational schemas in MySQL, establishing foreign key cascading rules, and managing connection pooling efficiently via mysql2/promise.'),
          bullet('Application Security: Implemented industry-standard cryptographic techniques, utilizing Bcrypt for password protection and JWT for stateless authentication while eliminating role enumeration vulnerabilities.'),
          bullet('Data Visualization & Localization: Successfully integrated Recharts to transform raw transaction records into actionable visual trends, localizing currency representations natively in Nepali Rupees (Rs.).'),

          h2('5.2 Conclusion'),
          p('The "Smart Expense Tracker" has been successfully designed, developed, tested, and documented. The application fulfills all functional objectives defined during requirement analysis, resolving the inefficiencies, vulnerabilities, and computational inaccuracies of traditional manual registers and static spreadsheets.'),
          p('By leveraging a robust modern stack—React 19, Tailwind CSS v4, Node.js, Express.js, and MySQL—the application delivers instant financial calculation, strict date validity enforcement (allowing entries for today and up to one year in the past while blocking future entries), live budget threshold alerts, portable CSV/PDF exports, and centralized administrative management with automated SQL database backups.'),
          p('All quality assurance test cases achieved a 100% pass rate. The project demonstrates the successful application of software engineering principles, producing a reliable and practical tool for personal financial management.'),

          h2('5.3 Future Recommendations'),
          p('While the project satisfies all requirements of the BCA 4th Semester Minor Project, future iterations can implement several advanced capabilities:'),
          bullet('AI-Powered OCR Receipt Scanning: Integrating Optical Character Recognition (e.g. Tesseract.js or Google Cloud Vision API) to extract amounts, dates, and vendor categories automatically from scanned paper receipts.'),
          bullet('Cross-Platform Mobile Application: Developing a native mobile client using React Native with SQLite for offline-first transaction recording and background cloud synchronization.'),
          bullet('Digital Wallet & SMS Parsing: Implementing secure parsers to read transaction SMS feeds from popular Nepali payment services (eSewa, Khalti, ConnectIPS) with explicit user consent.'),
          bullet('Predictive Machine Learning Budgeting: Developing machine learning regression models to forecast future expenditure patterns and provide personalized recommendations for savings optimization.'),

          // ==================== REFERENCES ====================
          h1('REFERENCES', true),
          p('1. Elmasri, R., & Navathe, S. B. (2016). Fundamentals of Database Systems (7th ed.). Pearson Education.\n' +
            '2. Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner\'s Approach (9th ed.). McGraw-Hill Education.\n' +
            '3. Flanagan, D. (2020). JavaScript: The Definitive Guide (7th ed.). O\'Reilly Media.\n' +
            '4. Banks, A., & Porcello, E. (2020). Learning React: Modern Patterns for Developing React Applications (2nd ed.). O\'Reilly Media.\n' +
            '5. Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). Database System Concepts (7th ed.). McGraw-Hill Education.\n' +
            '6. Sommerville, I. (2016). Software Engineering (10th ed.). Pearson Education.\n' +
            '7. Thaler, R. H. (1999). "Mental Accounting Matters." Journal of Behavioral Decision Making, 12(3), 183–206.\n' +
            '8. Karlan, D., McConnell, M., Mullainathan, S., & Zinman, J. (2016). "Getting to the Top of Mind: How Reminders Increase Saving." Management Science, 62(12), 3393–3411.\n' +
            '9. Kaye, J., McCuistion, M., Gulotta, R., & Shamma, D. A. (2014). "Money Talks: Tracking Personal Finances." Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, 521–530.\n' +
            '10. Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures (Doctoral dissertation). University of California, Irvine.\n' +
            '11. React Official Documentation (2026). React 19 Documentation and API Reference. Meta Open Source. https://react.dev\n' +
            '12. Express.js Documentation (2026). Fast, Unopinionated Web Framework for Node.js. https://expressjs.com\n' +
            '13. MySQL 8.0 Reference Manual (2026). Oracle Corporation. https://dev.mysql.com/doc/refman/8.0/en/\n' +
            '14. Tailwind CSS Documentation (2026). Utility-First CSS Framework. https://tailwindcss.com\n' +
            '15. Recharts Documentation (2026). Chart Library for React. https://recharts.org\n' +
            '16. Tribhuvan University (2021). Curriculum and Project Guidelines for Bachelor in Computer Application (BCA). Faculty of Humanities and Social Sciences, Tribhuvan University, Kathmandu, Nepal.', { line: 280 }),

          // ==================== APPENDICES ====================
          h1('APPENDICES', true),
          h2('APPENDIX A: APPLICATION SCREENSHOTS'),

          figureCaption('Fig A.1: User Dashboard Overview with Financial KPI Cards'),
          embedImage(path.join(screenshotsDir, 'dashboard.png'), 500, 280),

          figureCaption('Fig A.2: Searchable Transaction History Table with Action Buttons'),
          embedImage(path.join(screenshotsDir, 'transactions.png'), 500, 280),

          h2('APPENDIX B: KEY SOURCE CODE SNIPPETS'),

          h3('B.1 Main Application Router (`client/src/App.jsx`)'),
          codeBox(
            'import { BrowserRouter, Routes, Route, Navigate } from \'react-router-dom\';\n' +
            'import { Toaster } from \'react-hot-toast\';\n' +
            'import { AuthProvider } from \'./context/AuthContext\';\n' +
            'import ProtectedRoute from \'./components/ProtectedRoute\';\n' +
            'import AdminRoute from \'./components/AdminRoute\';\n' +
            'import Layout from \'./components/Layout\';\n' +
            'import AdminLayout from \'./components/AdminLayout\';\n' +
            'import Login from \'./pages/Login\';\n' +
            'import Register from \'./pages/Register\';\n' +
            'import Dashboard from \'./pages/Dashboard\';\n' +
            'import Transactions from \'./pages/Transactions\';\n' +
            'import Budgets from \'./pages/Budgets\';\n' +
            'import Reports from \'./pages/Reports\';\n' +
            'import AdminLogin from \'./pages/admin/AdminLogin\';\n' +
            'import AdminDashboard from \'./pages/admin/AdminDashboard\';\n' +
            'import AdminUsers from \'./pages/admin/AdminUsers\';\n' +
            'import AdminTransactions from \'./pages/admin/AdminTransactions\';\n' +
            'import AdminBackup from \'./pages/admin/AdminBackup\';\n' +
            'import AdminSettings from \'./pages/admin/AdminSettings\';\n\n' +
            'function App() {\n' +
            '  return (\n' +
            '    <AuthProvider>\n' +
            '      <BrowserRouter>\n' +
            '        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />\n' +
            '        <Routes>\n' +
            '          <Route path="/login" element={<Login />} />\n' +
            '          <Route path="/register" element={<Register />} />\n' +
            '          <Route path="/admin/login" element={<AdminLogin />} />\n' +
            '          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>\n' +
            '            <Route index element={<Dashboard />} />\n' +
            '            <Route path="transactions" element={<Transactions />} />\n' +
            '            <Route path="budgets" element={<Budgets />} />\n' +
            '            <Route path="reports" element={<Reports />} />\n' +
            '          </Route>\n' +
            '          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>\n' +
            '            <Route index element={<AdminDashboard />} />\n' +
            '            <Route path="users" element={<AdminUsers />} />\n' +
            '            <Route path="transactions" element={<AdminTransactions />} />\n' +
            '            <Route path="backup" element={<AdminBackup />} />\n' +
            '            <Route path="settings" element={<AdminSettings />} />\n' +
            '          </Route>\n' +
            '          <Route path="*" element={<Navigate to="/" replace />} />\n' +
            '        </Routes>\n' +
            '      </BrowserRouter>\n' +
            '    </AuthProvider>\n' +
            '  );\n' +
            '}\n' +
            'export default App;'
          ),

          h3('B.2 Transaction Controller with 1-Year Date Constraints (`server/controllers/transactionController.js`)'),
          codeBox(
            'const { getTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } = require(\'../models/transactionModel\');\n\n' +
            'const formatDate = (d) => {\n' +
            '  const year = d.getFullYear();\n' +
            '  const month = String(d.getMonth() + 1).padStart(2, \'0\');\n' +
            '  const day = String(d.getDate()).padStart(2, \'0\');\n' +
            '  return `${year}-${month}-${day}`;\n' +
            '};\n\n' +
            'const validateTransactionDate = (date) => {\n' +
            '  if (!date) return { valid: false, message: \'Transaction date is required\' };\n' +
            '  const inputDate = String(date).split(\'T\')[0];\n' +
            '  const now = new Date();\n' +
            '  const todayStr = formatDate(now);\n' +
            '  const oneYearAgo = new Date(now);\n' +
            '  oneYearAgo.setFullYear(now.getFullYear() - 1);\n' +
            '  const oneYearAgoStr = formatDate(oneYearAgo);\n\n' +
            '  if (inputDate > todayStr) {\n' +
            '    return { valid: false, message: \'Future transaction dates are not allowed.\' };\n' +
            '  }\n' +
            '  if (inputDate < oneYearAgoStr) {\n' +
            '    return { valid: false, message: \'Past transactions can only be recorded up to 1 year back from the current date.\' };\n' +
            '  }\n' +
            '  return { valid: true, date: inputDate };\n' +
            '};\n\n' +
            'const create = async (req, res) => {\n' +
            '  const { type, amount, category, description, date } = req.body;\n' +
            '  if (!type || !amount || !category || !date)\n' +
            '    return res.status(400).json({ message: \'type, amount, category and date are required\' });\n\n' +
            '  const dateValidation = validateTransactionDate(date);\n' +
            '  if (!dateValidation.valid) {\n' +
            '    return res.status(400).json({ message: dateValidation.message });\n' +
            '  }\n\n' +
            '  const id = await createTransaction(req.user.id, { type, amount, category, description, date: dateValidation.date });\n' +
            '  res.status(201).json({ id, message: \'Transaction created\' });\n' +
            '};'
          ),

          h3('B.3 Authentication Controller with Portal Isolation (`server/controllers/authController.js`)'),
          codeBox(
            'const login = async (req, res) => {\n' +
            '  const { email, password, portal } = req.body;\n' +
            '  if (!email || !password)\n' +
            '    return res.status(400).json({ message: \'Email and password are required\' });\n\n' +
            '  const user = await findUserByEmail(email);\n' +
            '  if (!user) return res.status(401).json({ message: \'Invalid credentials\' });\n\n' +
            '  const match = await bcrypt.compare(password, user.password);\n' +
            '  if (!match) return res.status(401).json({ message: \'Invalid credentials\' });\n\n' +
            '  // Enforce portal-specific access rules silently without disclosing roles\n' +
            '  if (portal === \'user\' && user.role === \'admin\') {\n' +
            '    return res.status(401).json({ message: \'Invalid credentials\' });\n' +
            '  }\n' +
            '  if (portal === \'admin\' && user.role !== \'admin\') {\n' +
            '    return res.status(401).json({ message: \'Invalid credentials\' });\n' +
            '  }\n\n' +
            '  const payload = { id: user.id, name: user.name, email: user.email, role: user.role || \'user\' };\n' +
            '  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || \'7d\' });\n' +
            '  res.json({ token, user: payload });\n' +
            '};'
          )
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(reportDir, 'Smart_Expense_Tracker_TU_Report.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`TU Project Report successfully written to: ${outputPath}`);
}

buildTUReport().then(() => {
  console.log('Build completed!');
}).catch(err => {
  console.error('Error generating TU report:', err);
});
