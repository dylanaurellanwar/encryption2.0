window.onload = () => {
    
    document.getElementById('input').focus()
    
    function addBlock (text) {
        document.getElementById('blockwrap').innerHTML += '<div class="block" id="log' + appLog.length + '">' + text + '</div>'
        appLog.push(text)
        scroll()
    }

    function notification (text) {
        document.getElementById('notification').innerHTML = text
        document.getElementById('notification').style.display = 'block'
        setTimeout(() => {
            document.getElementById('notification').style.display = 'none'
            document.getElementById('notification').innerHTML = ''
        }, 2000);
    }

    function scroll () {
        document.documentElement.scrollIntoView(false)
    }

    let progress = 0
    let eod = ''
    let text = ''
    let key = ''
    let appLog = [ 'Welcome' , 'Enter @help for help' , '--------------------' ]

    document.onkeydown = (e) => {
        if (e.which == 13) {
            let getInput = document.getElementById('input').value
            document.getElementById('input').value = ''
            if (getInput == '@help') {
                addBlock('Tutorial :')
                addBlock('&nbsp;&nbsp;Enter <span style="background-color: green; color: black;">&nbsp;e&nbsp;</span> for encrypt or <span style="background-color: green; color: black;">&nbsp;d&nbsp;</span> for decrypt')
                addBlock('&nbsp;&nbsp;Enter your text')
                addBlock('&nbsp;&nbsp;Enter your key')
                addBlock('--------------------')
            } else {
                switch (progress) {
                    case 0:
                        if (getInput == 'e') {
                            progress = 1
                            eod = 'e'
                            addBlock('Encrypt')
                        }
                        else if (getInput == 'd') {
                            progress = 1
                            eod = 'd'
                            addBlock('Decrypt')
                        }
                        else {
                            notification('False input')
                        }
                        break
                    case 1:
                        text = getInput
                        progress = 2
                        addBlock(text)
                        break
                    case 2:
                        key = getInput
                        progress = 0
                        addBlock(key)
                        if (eod == 'e') {
                            addBlock(encrypt(text,key))
                            notification('Encrypted successfully')
                        } else {
                            addBlock(decrypt(text,key))
                            notification('Decrypted successfully')
                        }
                        addBlock('--------------------')
                        break
                }
            }
        }
    }

    document.getElementById('blockwrap').onclick = (e) => {
        let getId = e.target.id
        getId = getId.slice(3)
        navigator.clipboard.writeText(appLog[parseInt(getId)].replaceAll('&nbsp;',''));
        notification('Text copied')
        document.getElementById('input').focus()
    }

}