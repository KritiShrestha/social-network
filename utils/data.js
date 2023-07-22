const data = {
  users: [
    {
      username: 'john_doe',
      email: 'john.doe@example.com'
    },
    {
      username: 'jane_smith',
      email: 'jane.smith@example.com'
    },
    {
      username: 'mike_johnson',
      email: 'mike.johnson@example.com'
    },
    {
      username: 'emma_wilson',
      email: 'emma.wilson@example.com'
    },
    {
      username: 'alex_brown',
      email: 'alex.brown@example.com'
    }
  ],
  thoughts: [
    {
      thoughtText: 'Hello, everyone!',
      username: 'john_doe',
      reactions: [
        { reactionBody: '❤️', username: 'jane_smith' },
        { reactionBody: 'Cool Thought', username: 'jane_smith' }
      ]
    },
    {
      thoughtText: 'Just had a great day at the beach!',
      username: 'jane_smith',
      reactions: [
        { reactionBody: '👋', username: 'john_doe' },
        { reactionBody: 'Smiley!', username: 'john_doe' }
      ]
    },
    {
      thoughtText: 'Coding is fun!',
      username: 'mike_johnson',
      reactions: [
        { reactionBody: 'Good Job', username: 'john_doe' }
      ]
    },
    {
      thoughtText: 'Excited for the weekend!',
      username: 'emma_wilson',
      reactions: [
        { reactionBody: '😊', username: 'jane_smith' }
      ]
    },
    {
      thoughtText: 'Learning new skills is always fulfilling.',
      username: 'alex_brown',
      reactions: []
    }
  ]
};

module.exports = data;
