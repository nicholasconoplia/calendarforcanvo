const fs = require('fs');
const { format, parseISO, isValid } = require('date-fns');

// Read tasks from JSON file
const tasks = require('./tasks.json');

// Generate ICS content
function generateICSContent(tasks) {
  // ICS file header
  let icsContent = 'BEGIN:VCALENDAR\r\n';
  icsContent += 'VERSION:2.0\r\n';
  icsContent += 'PRODID:-//Canvo//TodoApp//EN\r\n';
  icsContent += 'CALSCALE:GREGORIAN\r\n';
  icsContent += 'METHOD:PUBLISH\r\n';

  // Get current timestamp in ICS format
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  const timestamp = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

  // Add events for each task
  tasks.forEach(task => {
    if (task.dueDate) {
      const dueDate = parseISO(task.dueDate);
      
      if (isValid(dueDate)) {
        // Format date to ICS format (YYYYMMDD)
        const dateFormatted = format(dueDate, 'yyyyMMdd');
        
        icsContent += 'BEGIN:VEVENT\r\n';
        icsContent += `UID:${task.id}@canvo.app\r\n`;
        icsContent += `DTSTAMP:${timestamp}\r\n`;
        icsContent += `DTSTART;VALUE=DATE:${dateFormatted}\r\n`;
        icsContent += `DTEND;VALUE=DATE:${dateFormatted}\r\n`;
        icsContent += `SUMMARY:${task.text}\r\n`;
        
        // Add description with category and priority
        let description = `Category: ${task.category}`;
        if (task.priority) {
          description += `\\nPriority: ${task.priority}`;
        }
        if (task.notes) {
          description += `\\n\\n${task.notes.replace(/\n/g, '\\n')}`;
        }
        icsContent += `DESCRIPTION:${description}\r\n`;
        
        // Add category
        icsContent += `CATEGORIES:${task.category}\r\n`;
        
        // Set status based on completion
        icsContent += task.completed ? 'STATUS:COMPLETED\r\n' : 'STATUS:CONFIRMED\r\n';
        
        // Add priority if available (1=high, 5=medium, 9=low)
        if (task.priority) {
          const icsPriority = task.priority === 'HIGH' ? 1 : (task.priority === 'MEDIUM' ? 5 : 9);
          icsContent += `PRIORITY:${icsPriority}\r\n`;
        }
        
        icsContent += 'END:VEVENT\r\n';
      }
    }
  });

  // ICS file footer
  icsContent += 'END:VCALENDAR\r\n';
  
  return icsContent;
}

// Generate ICS file
const icsContent = generateICSContent(tasks);
fs.writeFileSync('calendar.ics', icsContent);

console.log('Calendar.ics file generated successfully.'); 