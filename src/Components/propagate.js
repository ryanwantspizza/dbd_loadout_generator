function update_heirachy(item) {
    if (item.type === 'trait' && item.allowed === true) {

    } else if (parent_item(item) && item.type === 'category') {

    }
}