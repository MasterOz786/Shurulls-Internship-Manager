const crypto = require('crypto');

exports.generateMeetingLink = async () => {
  const randomBytes = crypto.randomBytes(16);
  const meetingId = randomBytes.toString('hex');
  return `https://meet.example.com/${meetingId}`;
};