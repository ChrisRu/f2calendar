import { parseICS } from '../ICSParser';

test('ics parser - splitting verbs', () => {
  const result = parseICS(`X-VALUE:VCALENDAR`);

  expect(result).toEqual({ 'X-VALUE': 'VCALENDAR' });
});

test('ics parser - with metadata', () => {
  const result = parseICS(`DTSTART;TZID=Asia/Bahrain:20190330T174000Z`);

  expect(result).toEqual({
    DTSTART: {
      TZID: 'Asia/Bahrain',
      _value: '20190330T174000Z'
    }
  });
});

test('ics parser - link', () => {
  const result = parseICS(`UID:https://google.com/`);

  expect(result).toEqual({
    UID: 'https://google.com/'
  });
});

test('ics parser - indentation', () => {
  const result = parseICS(`
    BEGIN:VCALENDAR
    VERSION:2.0

    BEGIN:VEVENT
    LOCATION:Melbourne
    END:VEVENT

    END:VCALENDAR
  `);

  expect(result).toEqual({
    VCALENDAR: [
      {
        VERSION: 2,
        VEVENT: [
          {
            LOCATION: 'Melbourne'
          }
        ]
      }
    ]
  });
});

test('ics parser - multiple indentation', () => {
  const result = parseICS(`
    BEGIN:VCALENDAR
    VERSION:2.0

    BEGIN:VEVENT
    LOCATION:Melbourne
    END:VEVENT

    BEGIN:VEVENT
    LOCATION:Chicago
    END:VEVENT

    END:VCALENDAR
  `);

  expect(result).toEqual({
    VCALENDAR: [
      {
        VERSION: 2,
        VEVENT: [
          {
            LOCATION: 'Melbourne'
          },
          {
            LOCATION: 'Chicago'
          }
        ]
      }
    ]
  });
});

test('ics parser - realistic example', () => {
  const result = parseICS(`
    BEGIN:VCALENDAR
    VERSION:2.0
    X-ORIGINAL-URL:http://www.f2calendar.com
    X-WR-CALNAME:F2 Calendar 2019
    METHOD:PUBLISH
    PRODID:f2calendar.com

    BEGIN:VEVENT
    LOCATION:Melbourne
    SUMMARY:First Practice Session (Australian Grand Prix)
    UID:http://2019.f1calendar.com#GP1_2019P1
    DTSTART;VALUE=DATE-TIME:20190315T010000Z
    DTEND;VALUE=DATE-TIME:20190315T023000Z
    DTSTAMP:20190315T010000Z
    CATEGORIES:First Practice Session
    GEO:-37.8373;144.9666
    SEQUENCE:2019
    BEGIN:VALARM
    ACTION:DISPLAY
    DESCRIPTION:First Practice Session (Australian Grand Prix) starts in 20 minutes
    TRIGGER:-P0DT0H20M0S
    END:VALARM
    END:VEVENT

    BEGIN:VEVENT
    LOCATION:Melbourne
    SUMMARY:Second Practice Session (Australian Grand Prix)
    UID:http://2019.f1calendar.com#GP1_2019P1
    DTSTART;VALUE=DATE-TIME:20190315T010000Z
    DTEND;VALUE=DATE-TIME:20190315T023000Z
    DTSTAMP:20190315T010000Z
    CATEGORIES:Second Practice Session
    GEO:-37.8373;144.9666
    SEQUENCE:2019
    BEGIN:VALARM
    ACTION:DISPLAY
    DESCRIPTION:Second Practice Session (Australian Grand Prix) starts in 20 minutes
    TRIGGER:-P0DT0H20M0S
    END:VALARM
    BEGIN:VALARM
    ACTION:DISPLAY
    DESCRIPTION:Second Practice Session (Australian Grand Prix) starts in 10 minutes
    TRIGGER:-P0DT0H10M0S
    END:VALARM
    BEGIN:VALARM
    ACTION:DISPLAY
    DESCRIPTION:Second Practice Session (Australian Grand Prix) is starting now
    TRIGGER:-P0DT0H0M0S
    END:VALARM
    END:VEVENT

    END:VCALENDAR
`);

  expect(result).toEqual({
    VCALENDAR: [
      {
        METHOD: 'PUBLISH',
        PRODID: 'f2calendar.com',
        VERSION: 2,
        VEVENT: [
          {
            CATEGORIES: 'First Practice Session',
            DTEND: { _value: '20190315T023000Z', VALUE: 'DATE-TIME' },
            DTSTAMP: { _value: '20190315T010000Z' },
            DTSTART: { _value: '20190315T010000Z', VALUE: 'DATE-TIME' },
            GEO: '-37.8373;144.9666',
            LOCATION: 'Melbourne',
            SEQUENCE: 2019,
            SUMMARY: 'First Practice Session (Australian Grand Prix)',
            UID: 'http://2019.f1calendar.com#GP1_2019P1',
            VALARM: [
              {
                ACTION: 'DISPLAY',
                DESCRIPTION: 'First Practice Session (Australian Grand Prix) starts in 20 minutes',
                TRIGGER: '-P0DT0H20M0S'
              }
            ]
          },
          {
            CATEGORIES: 'Second Practice Session',
            DTEND: { _value: '20190315T023000Z', VALUE: 'DATE-TIME' },
            DTSTAMP: { _value: '20190315T010000Z' },
            DTSTART: { _value: '20190315T010000Z', VALUE: 'DATE-TIME' },
            GEO: '-37.8373;144.9666',
            LOCATION: 'Melbourne',
            SEQUENCE: 2019,
            SUMMARY: 'Second Practice Session (Australian Grand Prix)',
            UID: 'http://2019.f1calendar.com#GP1_2019P1',
            VALARM: [
              {
                ACTION: 'DISPLAY',
                DESCRIPTION: 'Second Practice Session (Australian Grand Prix) starts in 20 minutes',
                TRIGGER: '-P0DT0H20M0S'
              },
              {
                ACTION: 'DISPLAY',
                DESCRIPTION: 'Second Practice Session (Australian Grand Prix) starts in 10 minutes',
                TRIGGER: '-P0DT0H10M0S'
              },
              {
                ACTION: 'DISPLAY',
                DESCRIPTION: 'Second Practice Session (Australian Grand Prix) is starting now',
                TRIGGER: '-P0DT0H0M0S'
              }
            ]
          }
        ],
        'X-ORIGINAL-URL': 'http://www.f2calendar.com',
        'X-WR-CALNAME': 'F2 Calendar 2019'
      }
    ]
  });
});
