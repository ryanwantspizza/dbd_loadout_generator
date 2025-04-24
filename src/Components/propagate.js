// Function: update_heirachy
// Updates the hierarchy of items based on their type and allowed state.
// Parameters:
// - item: The item to be processed.
function update_heirachy(item) {
    if (item.type === 'trait' && item.allowed === true) {

    } else if (parent_item(item) && item.type === 'category') {

    }
}