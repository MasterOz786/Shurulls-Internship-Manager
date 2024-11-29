const Meeting = require('../models/Meeting');
const { sendNotification } = require('../utils/notifications');
const { generateMeetingLink } = require('../utils/meeting');

exports.scheduleMeeting = async (req, res) => {
  try {
    const { title, date, duration, participants, agenda } = req.body;
    
    const meetingLink = await generateMeetingLink();
    
    const meeting = new Meeting({
      title,
      date,
      duration,
      organizer: req.user._id,
      participants,
      agenda,
      meetingLink
    });

    await meeting.save();

    // Notify participants
    for (const participant of participants) {
      await sendNotification({
        to: participant.user,
        type: 'MEETING_SCHEDULED',
        message: `New meeting scheduled: ${title} on ${new Date(date).toLocaleString()}`
      });
    }

    res.status(201).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateMeetingResponse = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { status } = req.body;

    const meeting = await Meeting.findOne({
      _id: meetingId,
      'participants.user': req.user._id
    });

    if (!meeting) {
      return res.status(404).json({ success: false, error: 'Meeting not found' });
    }

    const participant = meeting.participants.find(p => 
      p.user.toString() === req.user._id.toString()
    );
    participant.status = status;

    await meeting.save();

    // Notify organizer
    await sendNotification({
      to: meeting.organizer,
      type: 'MEETING_RESPONSE',
      message: `A participant has ${status} the meeting: ${meeting.title}`
    });

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};