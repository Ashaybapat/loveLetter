// 💌 Love Letter Configuration
// Customize everything here to make it perfect for your Valentine!

const letterConfig = {
    // Header Information
    header: {
        date: "February 14, 2026",
        recipientName: "Stuti",          // Her name
        senderName: "Ashay",               // Your name
    },

    // Letter Content
    content: {
        greeting: "My Dearest Stutiful,",           // Opening greeting
        
        // Main letter text - Each paragraph is typed separately
        paragraphs: [
            "As I sit down to write this, my heart is full of emotions that words can barely capture. From the moment you came into my life, everything changed. The world became brighter, colors more vivid, and every day felt like a gift.",
            
            "You have this incredible way of making me smile even on my toughest days. Your laugh is my favorite sound, your smile my favorite sight, and your happiness my ultimate goal. When I'm with you, I feel like I'm exactly where I'm meant to be.",
            
            "I love the little things – the way you tie your hair, how you get excited about meeting me, and the warmth of your hand in mine. These moments, seemingly insignificant to others, are my most treasured memories.",
            
            "This Valentine's Day, I want you to know that you're not just my fiance' – you're my best friend, my partner in crime, my favorite person, and the love of my life. Thank you for being you, for choosing me, and for making every day an adventure worth living.",
            
            "Here's to us, to our journey together, and to all the beautiful moments yet to come. I promise to love you more with each passing day, to support your dreams, to make you laugh, and to be there through it all."
        ],
        
        // Signature
        signature: {
            closingText: "With all my love,",
            name: "Ashay"
        },
        
        // P.S. Message (appears after main letter)
        ps: "You make every day feel like Valentine's Day. But today, I wanted to make it extra special for you. 💕"
    },

    // Typewriter Effect Settings
    typewriter: {
        typingSpeed: 30,              // Characters per second (20-50 recommended)
        paragraphDelay: 1500,         // Milliseconds between paragraphs
        showCursor: true,             // Show blinking cursor while typing
    },

    // Visual Settings
    visuals: {
        // Paper color and style
        paperColor: "#fffef7",        // Cream paper
        inkColor: "#2c1810",          // Dark brown ink
        
        // Envelope colors
        envelopeColor: "#e8b4b8",     // Light pink
        sealColor: "#ff6b9d",         // Pink seal
        
        // Background
        backgroundColor: "#fff5f7",    // Very light pink
        
        // Floating hearts
        heartColors: ["#ff6b9d", "#ff8fab", "#ffc1d3", "#ffe5ec"],
        heartCount: 15,               // Number of floating hearts (10-20)
    },

    // Music Settings (Optional)
    music: {
        enabled: false,               // Set to true when you add music
        autoplay: true,               // Try to autoplay
        musicUrl: "",                 // Cloudinary URL for romantic song
        volume: 0.4,                  // 0.0 to 1.0
    },

    // Animation Settings
    animations: {
        envelopeOpenDuration: 2000,   // How long envelope opening takes (ms)
        letterUnfoldDuration: 1500,   // How long letter unfolds (ms)
        heartFloatDuration: 15,       // Seconds for hearts to float (10-20)
    }
};
