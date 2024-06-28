var pool = require('./bd');

async function getTrucos() {
    var query = 'select * from trucos';
    var rows = await pool.query(query);
    return rows;
}

async function deleteTrucosById(id) {
    var query = 'delete from trucos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertTrucos(obj) {
    try {
    var query = 'insert into trucos set ?';
    var rows = await pool.query(query, [obj]);
    return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getTrucosById(id) {
    var query = "select * from trucos where id=?";
    var rows = await pool.query(query, [id]);
    return rows [0];
}

async function modificarTrucosById(obj, id) {
    try {
        var query = "update trucos set ? where id=? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTrucos, deleteTrucosById, insertTrucos, getTrucosById, modificarTrucosById }