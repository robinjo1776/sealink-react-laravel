<Modal
isOpen={isEmailModalOpen}
onClose={() => setEmailModalOpen(false)}
title="Send Email"
>
<div className="email-modal">
  <div>
    <label htmlFor="subject">Subject:</label>

    <input
      type="text"
      placeholder="Subject"
      onChange={(e) =>
        setEmailData({ ...emailData, subject: e.target.value })
      }
    />
  </div>
  <div>
    <label htmlFor="content">Content:</label>

    <textarea
      placeholder="Content"
      onChange={(e) =>
        setEmailData({ ...emailData, content: e.target.value })
      }
    />
  </div>
  <button
    type="submit"
    onClick={() => sendEmails(emailData.subject, emailData.content)}
  >
    Send
  </button>
</div>
</Modal>

<Modal
isOpen={isEmailModalOpen}
onClose={() => setEmailModalOpen(false)}
title="Send Email"
>
<form>
  <div>
    <label htmlFor="subject">Subject:</label>
    <input
      type="text"
      id="subject"
      name="subject"
      placeholder="Enter email subject"
      required
      onChange={(e) =>
        setEmailData({ ...emailData, subject: e.target.value })
      }
    />
  </div>
  <div>
    <label htmlFor="content">Content:</label>
    <textarea
      id="content"
      name="content"
      rows="5"
      placeholder="Write your message here..."
      required
      onChange={(e) =>
        setEmailData({ ...emailData, content: e.target.value })
      }
    />
  </div>
  <button
    type="submit"
    onClick={() => sendEmails(emailData.subject, emailData.content)}
  >
    Send
  </button>
</form>
</Modal>