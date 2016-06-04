module.exports = {
    linkify: function(text) {
        return text.replace(/\s+/g, '-').replace(/[^a-z0-9-]+|\s+/gmi, '').toLowerCase()
    }
}