$(document).ready(function() {

    const $list = $('ul')
    const $form = $('form')
    const $input = $form.find('input')
    const $showCompletedToggle = $('button.show-completed-toggle')

    $showCompletedToggle.on('click', toggleShowCompleted)

    $form.on('submit', function() {
        postNewTodo()

        return false
    })

    $list.on('click', function(event) {
        toggleDone($(event.target))

        return false
    })

    function toggleShowCompleted() {
        $list.toggleClass('hide-completed')
        const text = $list.hasClass('hide-completed') ? 'Show completed' : 'Hide completed'
        $showCompletedToggle.text(text)
    }

    function deleteTodo() {
        $.ajax({
            type: 'DELETE',
            url: '',
            data: {description: item},
            success: data => {
                $(event.target).remove()
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
                $list.append('<li><span></span>' + todoItem.description + '</li>')
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
