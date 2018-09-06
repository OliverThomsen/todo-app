$(document).ready(function() {

    const $list = $('ul')
    const $listItem = $list.find('li')
    const $deleteButton = $listItem.find('button')
    const $form = $('form')
    const $input = $form.find('input')
    const $showCompletedToggle = $('button.show-completed-toggle')

    $showCompletedToggle.on('click', toggleShowCompleted)

    $form.on('submit', postNewTodo)

    const deleteButtonWidth = $deleteButton.outerWidth()
    console.log(deleteButtonWidth)
    let mouseDown = false
    let mousePosX
    let moveX = 0;

    $listItem.on('mousedown', (event) => {
        mouseDown = true
        mousePosX = event.clientX
    })

    $listItem.on('mouseleave', (event) => {
        if (! mouseDown) return
        console.log('leave')
        mouseDown = false
        moveX = 0
        resetTranslate($listItem)
    })

    $listItem.on('mouseup', (event) => {
        if (moveX === 0) {
            toggleDone($(event.currentTarget))
        } else if (moveX > - deleteButtonWidth) {
            resetTranslate($(event.target))
        } else {
            $(event.target).css('transform', `translateX(-${deleteButtonWidth}px)`)
        }

        mouseDown = false
        moveX = 0
    })

    $listItem.on('mousemove', (event) => {
        if (!mouseDown) return

        event.preventDefault()

        moveX = event.clientX - mousePosX
        
        if (moveX < 0) {
            $(event.target).css('transform', `translateX(${moveX}px)`)
        }
    })

    $listItem.on('click', (event) => {
        if ($(event.target).is('button')) {
            deleteTodo($(event.currentTarget))
        }
    })

    function resetTranslate($element) {
        $element.css('transform', 'translate(0)')
    }

    function toggleShowCompleted() {
        $list.toggleClass('hide-completed')
        const text = $list.hasClass('hide-completed') ? 'Show completed' : 'Hide completed'
        $showCompletedToggle.text(text)
    }

    function deleteTodo($todoItem) {
        const description = $todoItem.find('span').text().trim()
        $.ajax({
            type: 'DELETE',
            url: '',
            data: {description: description},
            success: data => {
                $todoItem.remove()
            }
        })
    }

    function postNewTodo() {
        const todoItem = {
            description: $form.find('input').val(),
            done: false
        }

        $.ajax({
            type: 'POST',
            url: '',
            data: todoItem,
            success: data => {
                $input.val('')
                $list.append(`
                    <li>
                        <span>
                            <div></div>`
                            + todoItem.description +
                        `</span>
                    <button>Delete</button>
                </li>`)
            }
        })
    }

    function toggleDone($listItem) {
        if ($listItem.hasClass('loading')) return

        const todo = {
            description: $listItem.text().trim(),
            done: $listItem.hasClass('done') ? false : true
        }

        $listItem.addClass('loading')

        $.ajax({
            type: 'PATCH',
            url: '',
            data: todo,
            success: () => {
                $listItem.toggleClass('done')
                $listItem.removeClass('loading')
            }
        })
    }

})
