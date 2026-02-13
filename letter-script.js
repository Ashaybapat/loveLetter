// Love Letter Script
(function() {
    'use strict';

    let typingInterval;
    let currentParagraph = 0;
    let currentChar = 0;

    document.addEventListener('DOMContentLoaded', function() {
        initializeLetter();
    });

    function initializeLetter() {
        // Apply configuration
        applyConfig();

        // Create floating hearts
        createFloatingHearts();

        // Setup event listeners
        setupEventListeners();

        // Initialize music if enabled
        if (letterConfig.music && letterConfig.music.enabled) {
            initializeMusic();
        }
    }

    function applyConfig() {
        // Apply header info
        document.getElementById('letterDate').textContent = letterConfig.header.date;
        document.getElementById('recipientName').textContent = letterConfig.header.recipientName;
        document.getElementById('senderName').textContent = letterConfig.header.senderName;

        // Apply greeting
        document.getElementById('greeting').textContent = letterConfig.content.greeting;

        // Apply signature
        document.getElementById('signatureName').textContent = letterConfig.content.signature.name;
        document.querySelector('.signature-text').textContent = letterConfig.content.signature.closingText;

        // Apply PS
        document.getElementById('psContent').textContent = letterConfig.content.ps;

        // Apply photo if enabled
        console.log('Photo config:', letterConfig.photo);
        if (letterConfig.photo && letterConfig.photo.enabled) {
            console.log('Photo is enabled! Setting up...');
            document.getElementById('couplePhoto').src = letterConfig.photo.imageUrl;
            document.getElementById('photoCaption').textContent = letterConfig.photo.caption;
            console.log('Photo URL set to:', letterConfig.photo.imageUrl);
        } else {
            console.log('Photo is NOT enabled or photo config missing');
        }

        // Apply visual settings
        if (letterConfig.visuals) {
            document.documentElement.style.setProperty('--paper-color', letterConfig.visuals.paperColor);
            document.documentElement.style.setProperty('--ink-color', letterConfig.visuals.inkColor);
            document.documentElement.style.setProperty('--envelope-color', letterConfig.visuals.envelopeColor);
            
            document.body.style.backgroundColor = letterConfig.visuals.backgroundColor;
            document.querySelector('.letter-paper').style.backgroundColor = letterConfig.visuals.paperColor;
            document.querySelector('.letter-paper').style.color = letterConfig.visuals.inkColor;
        }
    }

    function createFloatingHearts() {
        const container = document.getElementById('heartsBackground');
        const heartCount = letterConfig.visuals?.heartCount || 15;
        const heartColors = letterConfig.visuals?.heartColors || ['#ff6b9d'];
        const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            // Random position
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            
            // Random color (if using colored hearts instead of emojis)
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];
            
            // Random animation delay and duration
            heart.style.animationDelay = Math.random() * 5 + 's';
            const duration = letterConfig.animations?.heartFloatDuration || 15;
            heart.style.animationDuration = (duration + Math.random() * 5) + 's';
            
            container.appendChild(heart);
        }
    }

    function setupEventListeners() {
        const openButton = document.getElementById('openButton');
        const closeButton = document.getElementById('closeButton');

        openButton.addEventListener('click', openLetter);
        closeButton.addEventListener('click', closeLetter);
    }

    function openLetter() {
        const envelope = document.querySelector('.envelope');
        const envelopeWrapper = document.getElementById('envelopeWrapper');
        const letterContainer = document.getElementById('letterContainer');
        const heartsBackground = document.getElementById('heartsBackground');

        // Animate envelope opening
        envelope.classList.add('opening');

        // Hide envelope and show letter
        setTimeout(() => {
            envelopeWrapper.classList.add('hidden');
            heartsBackground.classList.add('active');
            
            setTimeout(() => {
                letterContainer.classList.add('visible');
                
                // Dispatch letter opened event for music
                document.dispatchEvent(new Event('letterOpened'));
                
                // Start typing effect
                setTimeout(() => {
                    startTyping();
                }, 500);
            }, 500);
        }, letterConfig.animations?.envelopeOpenDuration || 2000);
    }

    function closeLetter() {
        const letterContainer = document.getElementById('letterContainer');
        const envelopeWrapper = document.getElementById('envelopeWrapper');
        const heartsBackground = document.getElementById('heartsBackground');
        const envelope = document.querySelector('.envelope');

        // Stop typing
        if (typingInterval) {
            clearInterval(typingInterval);
        }

        // Hide letter
        letterContainer.classList.remove('visible');
        heartsBackground.classList.remove('active');

        // Reset and show envelope
        setTimeout(() => {
            envelopeWrapper.classList.remove('hidden');
            envelope.classList.remove('opening');
            
            // Reset letter content
            currentParagraph = 0;
            currentChar = 0;
            document.getElementById('letterText').innerHTML = '';
            document.getElementById('signature').style.display = 'none';
            document.getElementById('psSection').style.display = 'none';
        }, 500);
    }

    function startTyping() {
        const letterText = document.getElementById('letterText');
        const paragraphs = letterConfig.content.paragraphs;
        const typingSpeed = 1000 / (letterConfig.typewriter?.typingSpeed || 30); // ms per character
        
        let currentParagraphElement = null;

        function typeNextCharacter() {
            if (currentParagraph >= paragraphs.length) {
                // Finished typing all paragraphs
                finishTyping();
                return;
            }

            // Create new paragraph if needed
            if (currentChar === 0) {
                currentParagraphElement = document.createElement('p');
                letterText.appendChild(currentParagraphElement);
            }

            const currentText = paragraphs[currentParagraph];
            
            if (currentChar < currentText.length) {
                // Add next character
                currentParagraphElement.textContent = currentText.substring(0, currentChar + 1);
                
                // Add cursor if enabled
                if (letterConfig.typewriter?.showCursor) {
                    const cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    currentParagraphElement.appendChild(cursor);
                }
                
                currentChar++;
            } else {
                // Finished current paragraph
                if (letterConfig.typewriter?.showCursor) {
                    // Remove cursor
                    const cursor = currentParagraphElement.querySelector('.typing-cursor');
                    if (cursor) cursor.remove();
                }
                
                currentParagraph++;
                currentChar = 0;
                
                // Delay before next paragraph
                if (currentParagraph < paragraphs.length) {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        typingInterval = setInterval(typeNextCharacter, typingSpeed);
                    }, letterConfig.typewriter?.paragraphDelay || 1500);
                }
            }
        }

        typingInterval = setInterval(typeNextCharacter, typingSpeed);
    }

    function finishTyping() {
        clearInterval(typingInterval);
        
        // Remove any remaining cursor
        const cursors = document.querySelectorAll('.typing-cursor');
        cursors.forEach(cursor => cursor.remove());
        
        console.log('Typing finished. Showing signature...');
        
        // Show signature
        setTimeout(() => {
            document.getElementById('signature').style.display = 'block';
            console.log('Signature shown');
            
            // Show photo after signature (if enabled)
            console.log('Checking photo config:', letterConfig.photo);
            if (letterConfig.photo && letterConfig.photo.enabled && letterConfig.photo.showAfterSignature) {
                console.log('Photo should show! Displaying photo section...');
                setTimeout(() => {
                    const photoSection = document.getElementById('photoSection');
                    photoSection.style.display = 'block';
                    console.log('Photo section display set to block');
                    
                    // Show PS after photo
                    setTimeout(() => {
                        document.getElementById('psSection').style.display = 'block';
                        console.log('PS shown');
                    }, 1000);
                }, 1000);
            } else {
                console.log('Photo NOT enabled or showAfterSignature is false');
                console.log('Photo config:', letterConfig.photo);
                // Show PS directly if no photo
                setTimeout(() => {
                    document.getElementById('psSection').style.display = 'block';
                    console.log('PS shown (no photo)');
                }, 1000);
            }
        }, 500);
    }

    function initializeMusic() {
        const musicPlayer = document.getElementById('musicPlayer');
        const musicToggle = document.getElementById('musicToggle');
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');

        if (!letterConfig.music || !letterConfig.music.musicUrl || letterConfig.music.musicUrl === '') {
            console.log('No music URL provided');
            return; // No music URL provided
        }

        // Show music player
        musicPlayer.style.display = 'block';

        // Set music source
        audioSource.src = letterConfig.music.musicUrl;
        audioPlayer.load(); // Important: Load the audio
        audioPlayer.volume = letterConfig.music.volume || 0.4;

        console.log('Music initialized with URL:', letterConfig.music.musicUrl);

        let isPlaying = false;

        // Try autoplay if enabled (after letter opens)
        if (letterConfig.music.autoplay) {
            // Wait for user interaction (letter opening)
            document.addEventListener('letterOpened', function() {
                setTimeout(() => {
                    audioPlayer.play().then(() => {
                        isPlaying = true;
                        musicToggle.textContent = '🔇 Stop Music';
                        console.log('Music started (autoplay)');
                    }).catch(err => {
                        console.log('Autoplay blocked by browser:', err.message);
                        musicToggle.textContent = '🎵 Play Music';
                    });
                }, 1000);
            }, { once: true });
        }

        // Toggle music on button click
        musicToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Music button clicked, isPlaying:', isPlaying);
            
            if (isPlaying) {
                audioPlayer.pause();
                musicToggle.textContent = '🎵 Play Music';
                isPlaying = false;
                console.log('Music paused');
            } else {
                audioPlayer.play().then(() => {
                    musicToggle.textContent = '🔇 Stop Music';
                    isPlaying = true;
                    console.log('Music playing');
                }).catch(err => {
                    console.error('Error playing audio:', err);
                    alert('Error playing music. Check console for details.');
                });
            }
        });

        // Handle audio errors
        audioPlayer.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            console.error('Audio error code:', audioPlayer.error?.code);
            console.error('Audio error message:', audioPlayer.error?.message);
            musicToggle.textContent = '❌ Music Error';
        });

        // Handle successful load
        audioPlayer.addEventListener('canplay', function() {
            console.log('Audio loaded and ready to play');
        });
    }
})();
