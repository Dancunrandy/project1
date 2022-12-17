// User registration and login

function register(email, password) {
    // Create a new user with the specified email and password
    const user = createUser(email, password);
  
    // Save the user to the database
    saveUser(user);
  
    // Return the user
    return user;
  }
  
  function login(email, password) {
    // Look up the user with the specified email
    const user = findUserByEmail(email);
  
    // If the user exists and the password is correct, return the user
    if (user && user.password === password) {
      return user;
    }
  
    // Otherwise, return null to indicate that the login failed
    return null;
  }
  
  // User profile
  
  function getUserProfile(userId) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Return the user's profile information
    return {
      name: user.name,
      profilePicture: user.profilePicture,
      bio: user.bio
    };
  }
  
  function updateUserProfile(userId, name, profilePicture, bio) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Update the user's profile information
    user.name = name;
    user.profilePicture = profilePicture;
    user.bio = bio;
  
    // Save the updated user to the database
    saveUser(user);
  }
  
  // Posts and photos
  
  function createPost(userId, text, photo) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Create a new post with the specified text and photo
    const post = createPost(user, text, photo);
  
    // Save the post to the database
    savePost(post);
  
    // Return the post
    return post;
  }
  
  function getUserPosts(userId) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Return the user's posts
    return user.posts;
  }
  
  function getFriendFeed(userId) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Get the user's friends
    const friends = user.friends;
  
    // Create an empty array to hold the posts from the user's friends
    const friendPosts = [];
  
    // Loop through the user's friends
    for (const friend of friends) {
      // Get the friend's posts
      const posts = getUserPosts(friend.id);
  
      // Add the friend's posts to the array
      friendPosts.push(...posts);
    }
  
    // Return the posts from the user's friends
    return friendPosts;
  }
  
  // Friends
  
  function addFriend(userId, friendId) {
    // Look up the user with the specified ID
    const user = findUserById(userId);
  
    // Look up the friend with the specified ID
    const friend = findUserById(friendId);
  
    // Add the friend to the user's list of friends
    user.friends.push(friend);
    