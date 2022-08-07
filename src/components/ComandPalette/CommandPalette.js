import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react'
import './CommandPalette.css'

export default function CommandPalette({ setIsDimmed }) {
    const cmds = [
        'New component',
        'New form',
        'New page',
        'New list'
    ];
    const [options, setOptions] = useState(cmds);
    const [showCmds, setShowCmds] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCmd, setSelectedCmd] = useState(null);
    const [query, setQuery] = useState(null);
    const palette = useRef();
    const input = useRef();

    useEffect(() => {
        window.addEventListener('keydown', openModal);

        function openModal(event) {
            if (
                event.key === 'C' &&
                event.shiftKey &&
                (event.ctrlKey || event.metaKey)
            ) {
                if (!showCmds) {
                    window.addEventListener('click', closeModalOnClick);
                    setShowCmds(true);

                    return;
                }
            }

            if (event.key === 'Escape') {
                closeModal();
            }
        }

        function closeModalOnClick(event) {
            if (!palette.current.contains(event.target)) {
                closeModal();
            }
        }

        function closeModal() {
            window.removeEventListener('click', closeModalOnClick);
            setShowCmds(false);
        }

        return () => {
            window.removeEventListener('keypress', openModal);
        }
    });

    useEffect(() => {
        if (showCmds) {
            setIsDimmed(true)
        } else {
            setIsDimmed(false);
        }
    }, [showCmds, setIsDimmed]);

    useEffect(() => {
        console.log('Selected Command:', selectedCmd);
    }, [selectedCmd]);

    function onKeyUp(event) {
        const value = event.target.value.toLowerCase().trim();
        const cmd = cmds.find(cmd => value.includes(cmd.toLowerCase()));

        // console.log('key up value:', value);
        // console.log(cmd);

        setSelectedCmd(cmd);

        if (value) {
            setQuery(value);

            if (cmd) {
                setOptions(cmds.filter(option => value.includes(option.toLowerCase()) ));
            } else {
                setOptions(cmds.filter(option => option.toLowerCase().includes(value)));
            }
        } else {
            setQuery(null);
            setOptions(cmds)
        }
    }

    function onKeyDown(event) {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevValue) => {
                const nextValue = prevValue + 1;

                return nextValue > options.length - 1 ? 0 : nextValue;
            });

            return;
        }

        if (event.key === 'ArrowUp') {
            setSelectedIndex((prevValue) => {
                const nextValue = prevValue - 1;

                return nextValue < 0 ? options.length - 1 : nextValue;
            });

            return;
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            
            // console.log('tab: ', options[selectedIndex]);
            // console.log('query: ', query);
            // console.log('selected: ', selectedIndex);

            event.target.value = options[selectedIndex] || '';

            setSelectedIndex(0);

            return;
        }

        if (event.key === 'Enter') {
            const value = event.target.value.toLowerCase().trim();
            const cmd = cmds.find(cmd => value.includes(cmd.toLowerCase()));
    
            console.log('key down value:', value);
            console.log(cmd);
            // console.log('index: ', selectedIndex);

            // Case #1: Select option
            // if (options.length > 1) {
            if (!cmd) {
                console.log('enter: select option');

                const cmd = options[selectedIndex];
                setSelectedCmd(cmd);

                event.target.value = cmd;
                event.target.focus();
    
                setQuery(cmd.toLowerCase());
                setOptions(cmds.filter(option => option.toLowerCase().includes(cmd.toLowerCase())));
                setSelectedIndex(0);

                return;
            }

            // Case #2: Submit command
            console.log('enter: submit command');

            return;
        }
    }

    return (
        showCmds && 
        <div
            className="command-palette"
            ref={palette}
            onKeyDown={onKeyDown}
        >
            <div className='input-ctr'>
                Run
                <i className="bi bi-caret-right-fill"></i>
                <input type='text' placeholder='Command' autoFocus={true} onKeyUp={onKeyUp} ref={input} />
            </div>
            <div className='cmds-ctr'>
                {
                    options.map((option, index) => {
                        const splitOn = selectedCmd?.toLowerCase() || query;
                        // console.log(splitOn);

                        const parts = option
                            .split(new RegExp(`(${splitOn})`, 'i'))
                            .filter(i => i);

                            // console.log(parts);

                        return (
                            <div
                                key={option}
                                className={classNames('cmd', {selected: index === selectedIndex})}
                                onClick={() => {
                                    input.current.value = option;
                                    input.current.focus();

                                    setQuery(option.toLowerCase());
                                    setOptions(cmds.filter(cmd => cmd.toLowerCase().includes(option.toLowerCase())));
                                    setSelectedIndex(0);

                                    const cmd = cmds.find(cmd => cmd === option);
                            
                                    if (cmd) {
                                        setSelectedCmd(cmd);
                                    }
                                }}
                            >
                                <pre>
                                {parts.map((part, index) => {
                                    if (part.toLowerCase() === splitOn) {
                                        return (
                                            <span key={index} className='cmd-highlight'>{part}</span>
                                        );
                                    }

                                    return part
                                })}
                                </pre>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}