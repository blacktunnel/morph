/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Dialog = {
    "gary": {
        "name": "GARY",
        "face": "friend-man-closeup",
        "dialog": {
            "default": [
                {
                    "prompt": "Hey there, friend! How can I help you?",
                    "options": [
                        {
                            "text": "I can't remember anytihng. Do you know what happened to me?"
                        },
                        {
                            "text": "Do you... know me?",
                            "action": "skip"
                        }
                    ]
                },
                {
                    "prompt": "Well, no I'm not sure... Maybe try some other folks around town.",
                    "options": [
                        {
                            "text": "Alright, thanks.",
                            "action": "exit"
                        }
                    ]
                },
                {
                    "prompt": "Sure, I've seen you around. You're that shape-shifter everyone loves.",
                    "options": [
                        {
                            "text": "I can't remember anything. Do you know what happened to me?",
                            "action": "prev"
                        }
                    ]
                }
            ]
        }
    },
    "fred": {
        "name": "FRED",
        "face": "friend-monster-closeup",
        "dialog": {
            "default": [
                {
                    "prompt": "Howdy neighbor. What's the word?",
                    "options": [
                        {
                            "text": "Hi there. I can't seem to remember anything. Can you help me?"
                        },
                        {
                            "text": "Okay. What's going on? I've lost my memory."
                        }
                    ]
                },
                {
                    "prompt": "Oh no! How terrible. I saw you not too long ago. You were headed to see THE KID.",
                    "options": [
                        {
                            "text": "Who's THE KID?"
                        },
                        {
                            "text": "And where can I find this KID?"
                        }
                    ]
                },
                {
                    "prompt": "THE KID is our neighborhood mad scientist. He lives EAST of town in his LAB.'",
                    "questlog": {
                        "questID": "main",
                        "id": "kid"
                    },
                    "options": [
                        {
                            "text": "You don't happen to have a MAP do you?"
                        }
                    ]
                },
                {
                    "prompt": "No I don't. But maybe LLOYD has one. He likes to hang out by the pool here in town.",
                    "options": [
                        {
                            "text": "Cool. Thanks for the info.",
                            "action": "exit"
                        }
                    ]
                }
            ]
        }
    },
    "lloyd": {
        "name": "LLOYD",
        "face": "friend-man-closeup",
        "dialog": {
            "default": [
                {
                    "prompt": "Why, hello there.",
                    "options": [
                        {
                            "text": "Hello. I can't seem to remember anything. Can you help me?"
                        }
                    ]
                },
                {
                    "prompt": "Oh um. Maybe go and see THE KID. I used to see you and him together a lot.",
                    "options": [
                        {
                            "text": "Who's THE KID?"
                        },
                        {
                            "text": "And where can I find this KID?"
                        }
                    ]
                },
                {
                    "prompt": "THE KID is our neighborhood's mad scientist. He lives EAST of town in his LAB.",
                    "options": [
                        {
                            "text": "EAST huh? Mind giving more specific directions?"
                        }
                    ]
                },
                {
                    "prompt": "Here's a MAP to help you find the place.",
                    "questlog": {
                        "questID": "main",
                        "id": "map"
                    },
                    "options": [
                        {
                            "text": "Thanks Lloyd.",
                            "action": "exit"
                        }
                    ]
                }
            ],
            "floyd": [
                {
                    "prompt": "Hey there. Have I told you that I have a brother named FLOYD?",
                    "options": [
                        {
                            "text": "Yeah I know. I've met him. He claims you stole something from him."
                        },
                        {
                            "text": "Cut the crap LLOYD. You stole his AXE. Give it back.",
                            "action": "skip"
                        },
                        {
                            "text": "No, and I don't care.",
                            "action": "exit"
                        }
                    ]
                },
                {
                    "prompt": "Man, that guy won't let it go. I borrowed his AXE a long time ago. But something went wrong.",
                    "options": [
                        {
                            "text": "What?",
                            "action": "skip"
                        }
                    ]
                },
                {
                    "prompt": "Whoa! Hang on. I borrowed it! But I don't have it anymore.",
                    "options": [
                        {
                            "text": "What?"
                        }
                    ]
                },
                {
                    "prompt": "A bunch of those mosnters stole it and carried it off.",
                    "options": [
                        {
                            "text": "What's in it for me?"
                        },
                        {
                            "text": "Ugh... sure why not?",
                            "action": "skip"
                        },
                        {
                            "text": "Sorry. I'm too busy at the moment",
                            "action": "exit"
                        }
                    ]
                },
                {
                    "prompt": "Helping to reunite 2 long-lost brothers isn't enough? Fine I'll pay 100 coins.",
                    "options": [
                        {
                            "text": "Okay, I'll do it. Now where exactly did these monsters head off to?"
                        },
                        {
                            "text": "Sorry. I'm too busy at the moment",
                            "action": "exit"
                        }
                    ]
                },
                {
                    "prompt": "Great! I followed them for a bit. Think they were headed to a fortress called GLO-GATH.",
                    "options": [
                        {
                            "text": "Sounds like a nice place... I'll bring back that AXE soon.",
                            "action": "exit"
                        }
                    ]
                }
            ],
            "kid": [
                {
                    "prompt": "Why, hello there.",
                    "options": [
                        {
                            "text": "Hey Lloyd. I don't have time to chat. I lost my memory and I need a MAP to find out how to get to THE KID's LAB. Do you have one?"
                        }
                    ]
                },
                {
                    "prompt": "Oh my! Well of course. Here's my MAP. Keep it. Good luck pal!",
                    "questlog": {
                        "questID": "main",
                        "id": "map"
                    },
                    "options": [
                        {
                            "text": "Thanks. Bye.",
                            "action": "exit"
                        }
                    ]
                }
            ]
        }
    },
    "kid": {
        "name": "THE KID",
        "face": "kid-closeup",
        "dialog": {
            "default": [
                {
                    "prompt": "Hey man. How'd it go? Wait... where's your WRISTBAND?",
                    "options": [
                        {
                            "text": "How'd what go?"
                        },
                        {
                            "text": "Let me stop you right there. I lost my memory",
                            "action": "skip"
                        }
                    ]
                },
                {
                    "prompt": "Your fight with GRUNGOR?",
                    "options": [
                        {
                            "text": "I literally have no idea what you're talking about. I lost my memory..."
                        }
                    ]
                },
                {
                    "prompt": "What? Oh no this is bad... The WRISTBAND... UGH!",
                    "options": [
                        {
                            "text": "Okay. Fill me in here. Who are you and what happened to me?"
                        }
                    ]
                },
                {
                    "prompt": "Um. Alright. I'll give you the short version...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "You're a shape shifter. You are 1 of 2 of your kind on this entire planet...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "The other one, GRUNGOR is a bad apple. He's been terrorizing our world for a long time...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "You are the only one can stop him and save this planet...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "I've been helping you by trying to improve the transformation system...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "See, you're a shape-shifter but you and GRUNGOR are only able to change forms...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "with some help from certain MACHINES. You may have seen them before...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "Being restricted to using a MACHINE to transform is annoying so I made a WRISTBAND...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "It does the same thing as the MACHINES. Only you can bring it with you...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "But the last time I saw you, you were off to fight GRUNGOR...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "And now you've woken up with amnesia and no WRISTBAND, which means GRUNGOR has it.",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "Which also means he's got an advantage and you're back to using the MACHINES",
                    "options": [
                        {
                            "text": "Okay. Is it that bad?"
                        }
                    ]
                },
                {
                    "prompt": "It's not the worst thing. Just annoying mostly. Now you have to be more cautious.",
                    "options": [
                        {
                            "text": "Tell me more about being a shape-shifter."
                        }
                    ]
                },
                {
                    "prompt": "Right... okay. So you can transform into other shapes...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "These shapes aren't just visual. They give you abilities. GRUNGOR's got some gnarly ones...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "I've spent the last 6 months trying to find new ones for you to use...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "You had about 8 shapes available on the WRISTBAND. But that's the other problem...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "I lost the shapes that I had. The WRISTBAND was the only copy left.",
                    "options": [
                        {
                            "text": "You lost them?!?"
                        }
                    ]
                },
                {
                    "prompt": "GRUNGOR hacked the MACHINES' network and erased them...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "And he sent some of his goons to carry off my SAFE that held the backups...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "But, there's good news too. Each disc in that SAFE contained a shape...",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "A friend of mine saw a bird carrying the SAFE and saw it dropping discs along the way...",
                    "options": [
                        {
                            "text": "So I have to find these discs to unlock new shapes?"
                        }
                    ]
                },
                {
                    "prompt": "Precisely. He told me he saw a disc go down near a town called SCALA.",
                    "options": [
                        {
                            "text": "So that's the new plan? Get the discs back that we already had? What then?"
                        }
                    ]
                },
                {
                    "prompt": "Take on GRUNGOR again, and hope it goes better next time.",
                    "options": [
                        {
                            "text": "Right... Well I guess we don't have a choice."
                        }
                    ]
                },
                {
                    "prompt": "I'll ask around for any information on the locations of the other DISCS...",
                    "questlog": {
                        "questID": "main",
                        "id": "discs"
                    },
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "Now, before you go, let me show how these machines work.",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "When you come across a machine you can interact with it by hitting X.",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "You'll see a menu of the available shapes. Use the arrow keys/X to select one.",
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "Luckily I do still have one basic shape. I call it MAN.",
                    "questLog": {
                        "questID": "main",
                        "id": "man"
                    },
                    "options": [
                        {
                            "text": "Next"
                        }
                    ]
                },
                {
                    "prompt": "Try it out on my machine before you leave. But get moving ASAP.",
                    "options": [
                        {
                            "text": "Alright. Thanks for the info. Time to go to work.",
                            "action": "exit"
                        }
                    ]
                }
            ]
        }
    }
};

})( Game, Settings, window, document );
