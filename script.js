// Forensic Email Collector - Script

console.log('Script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    // Screen navigation functionality
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');
    const screen4 = document.getElementById('screen-4');
    const screen5 = document.getElementById('screen-5');
    const emailInput = document.querySelector('.email-input');
    const nextButton = document.getElementById('to-gmail-config');
    const emailDisplay = document.querySelectorAll('.email-display');
    const prevButton = document.querySelector('.nav-button.previous');
    const nextButton2 = document.querySelector('.nav-button.next');
    const imapLink = document.getElementById('to-imap-link');
    const imapPrevButton = document.querySelector('.imap-previous');
    const imapNextButton = document.querySelector('.imap-next');
    const custodianPrevButton = document.querySelector('.custodian-previous');
    const custodianNextButton = document.querySelector('.custodian-next');
    const outputPrevButton = document.querySelector('.output-previous');
    const outputNextButton = document.querySelector('.output-next');
    console.log('outputNextButton:', outputNextButton);

    let mimeModalShown = false;
    const mimeModal = document.getElementById('mime-modal');
    const mimeYesBtn = document.querySelector('.modal-yes');
    const mimeNoBtn = document.querySelector('.modal-no');
    const screen6 = document.getElementById('screen-6');
    const treeEmail = document.querySelector('.tree-email');
    const resumeLink = document.querySelector('.resume-link');
    const separator = document.querySelector('.separator');
    const helperText = document.querySelector('.helper-text');

    const screen7 = document.getElementById('screen-7');
    const emailSelectionNext = document.querySelector('.email-selection-next');
    const statsPrevious = document.querySelector('.stats-previous');
    const statsStart = document.querySelector('.stats-start');

    const screen8 = document.getElementById('screen-8');
    const closeButton = document.querySelector('.close-button');
    const openFolderBtn = document.querySelector('.open-folder');

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay hidden';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Enable next button when email is entered
    if (emailInput && nextButton) {
        emailInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                nextButton.removeAttribute('disabled');
            } else {
                nextButton.setAttribute('disabled', true);
            }
        });
    }

    // Navigate to screen 2 when next button is clicked
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email !== '') {
                // Store email in display on screen 2
                emailDisplay.forEach(display => {
                    display.textContent = email;
                });
                // Hide screen 1 and show screen 2
                screen1.classList.add('hidden');
                screen2.classList.remove('hidden');
            }
        });
    }

    // Navigate back to screen 1 when previous button is clicked
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            screen2.classList.add('hidden');
            screen1.classList.remove('hidden');
        });
    }

    // Navigate to IMAP screen when link is clicked
    if (imapLink) {
        imapLink.addEventListener('click', function(e) {
            e.preventDefault();
            screen2.classList.add('hidden');
            screen3.classList.remove('hidden');
        });
    }

    // Navigate back to API screen from IMAP screen
    if (imapPrevButton) {
        imapPrevButton.addEventListener('click', function() {
            screen3.classList.add('hidden');
            screen2.classList.remove('hidden');
        });
    }

    // Navigate to Custodian Information Form
    if (imapNextButton) {
        imapNextButton.addEventListener('click', function() {
            screen3.classList.add('hidden');
            screen4.classList.remove('hidden');
        });
    }

    // Navigate back to IMAP screen from Custodian Information Form
    if (custodianPrevButton) {
        custodianPrevButton.addEventListener('click', function() {
            screen4.classList.add('hidden');
            screen3.classList.remove('hidden');
        });
    }

    // Navigate to Output Configuration Screen from Custodian Information Form
    if (custodianNextButton) {
        custodianNextButton.addEventListener('click', function() {
            screen4.classList.add('hidden');
            screen5.classList.remove('hidden');
        });
    }

    // Email input validation
    if (emailInput && resumeLink && separator && helperText) {
        emailInput.addEventListener('focus', function() {
            resumeLink.style.display = 'none';
            separator.style.display = 'none';
            helperText.style.display = 'none';
            
            this.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    resumeLink.style.display = 'block';
                    separator.style.display = 'block';
                    helperText.style.display = 'block';
                }
            });
        });
    }
    
    // Window control buttons
    document.querySelectorAll('.window-button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('minimize')) {
                console.log('Minimize window');
            } else if (this.classList.contains('maximize')) {
                console.log('Maximize window');
            } else if (this.classList.contains('close')) {
                console.log('Close window');
            }
        });
    });
    
    // Resume link
    if (resumeLink) {
        resumeLink.addEventListener('click', function() {
            console.log('Resume previous project clicked');
        });
    }

    // Output Config NEXT button logic
    if (outputNextButton && mimeModal && screen6) {
        outputNextButton.addEventListener('click', function(e) {
            console.log('Output NEXT button clicked');
            if (!mimeModalShown) {
                e.preventDefault();
                mimeModal.classList.remove('hidden');
                mimeModalShown = true;
            } else {
                // Set email in tree view
                if (treeEmail && emailInput && emailInput.value) {
                    treeEmail.textContent = emailInput.value;
                }
                screen5.classList.add('hidden');
                screen6.classList.remove('hidden');
            }
        });
    }

    // Modal Yes/No logic
    if (mimeYesBtn && mimeModal && screen6) {
        mimeYesBtn.addEventListener('click', function() {
            console.log('Modal YES clicked');
            mimeModal.classList.add('hidden');
            
            // Open Gmail in new tab
            window.open('https://mail.google.com/', '_blank');
            
            // Set email in tree view and show screen 6
            if (treeEmail && emailInput && emailInput.value) {
                treeEmail.textContent = emailInput.value;
            }
            screen5.classList.add('hidden');
            screen6.classList.remove('hidden');
        });
    }

    if (mimeNoBtn && mimeModal) {
        mimeNoBtn.addEventListener('click', function() {
            console.log('Modal NO clicked');
            mimeModal.classList.add('hidden');
            mimeModalShown = false;
        });
    }

    // Prevent form submission on Output Configuration form
    const outputConfigForm = document.querySelector('.output-config-form');
    if (outputConfigForm) {
        outputConfigForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // Screen 6 functionality
    const selectAllBtn = document.querySelector('.action-button:nth-child(3)');
    
    // Select All functionality
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.tree-checkbox input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        });
    }

    // Navigate to screen 7 when clicking next on screen 6
    if (emailSelectionNext) {
        emailSelectionNext.addEventListener('click', function() {
            // Update email display in stats screen
            const statsEmailDisplay = screen7.querySelector('.email-display');
            if (statsEmailDisplay && emailInput && emailInput.value) {
                statsEmailDisplay.textContent = emailInput.value;
            }
            screen6.classList.add('hidden');
            screen7.classList.remove('hidden');
        });
    }

    // Navigate back to screen 6 from stats screen
    if (statsPrevious) {
        statsPrevious.addEventListener('click', function() {
            screen7.classList.add('hidden');
            screen6.classList.remove('hidden');
        });
    }

    // Handle START button click
    if (statsStart) {
        statsStart.addEventListener('click', function() {
            // Update progress text
            const progressText = document.querySelector('#screen-7 .progress-text');
            if (progressText) {
                progressText.textContent = 'Processing acquisition...';
            }

            // Start progress bar animation
            const progressBar = document.querySelector('#screen-7 .progress-bar');
            if (progressBar) {
                progressBar.classList.add('loading');
            }
            
            // Wait 5 seconds then show completion screen
            setTimeout(function() {
                // Get the user's email from the input
                const userEmail = emailInput.value.trim();
                
                // Update the completion screen email
                const completionEmail = document.querySelector('#screen-8 .completion-email');
                if (completionEmail && userEmail) {
                    completionEmail.textContent = userEmail;
                }
                
                screen7.classList.add('hidden');
                screen8.classList.remove('hidden');
                
                // Reset progress bar for next time
                if (progressBar) {
                    progressBar.classList.remove('loading');
                }
                if (progressText) {
                    progressText.textContent = 'Click START to begin acquisition';
                }
            }, 5000);
        });
    }

    // Handle close button click
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const screen9 = document.getElementById('screen-9');
            if (screen9) {
                // Update email in final screen
                const finalEmailDisplay = screen9.querySelector('.email-display');
                if (finalEmailDisplay && emailInput) {
                    finalEmailDisplay.textContent = emailInput.value.trim();
                }
                
                screen8.classList.add('hidden');
                screen9.classList.remove('hidden');
            }
        });
    }

    // Handle exit button click
    const exitButton = document.querySelector('.exit-button');
    if (exitButton) {
        exitButton.addEventListener('click', function() {
            // Reset to first screen
            document.querySelectorAll('.window-frame').forEach(screen => {
                screen.classList.add('hidden');
            });
            screen1.classList.remove('hidden');
            
            // Reset email input and next button
            if (emailInput) {
                emailInput.value = '';
            }
            if (nextButton) {
                nextButton.setAttribute('disabled', true);
            }
        });
    }

    // Handle open folder button click
    if (openFolderBtn) {
        openFolderBtn.addEventListener('click', function() {
            console.log('Opening output folder...');
            // Add folder opening logic here
        });
    }
}); 