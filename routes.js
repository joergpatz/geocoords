import db from './lib/mongo';

db.runCommand({ping: 1}, function (err, result) {
    if (!err && result.ok) console.log('we\'re up.');
});

const getAirportsFromPoint = (req, res, next) => {

    let [lat, long] = req.params.point.split(',');
    let m = (parseInt(req.params.km) || 20) * 1000;

    db.airports.find(
        {
            loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lat), parseFloat(long)]
                    },
                    $maxDistance: m
                }
            }
        },
        {_id: 0, name: 1, code: 1, type: 1, loc: 1},
        (err, result) => {
            if (err) {
                res.send(500, err);
            } else {
                res.send(result);
            }
            return next();
        }
    );

};

const getAirportsFromState = (req, res, next) => {

    //todo: sanitize
    let state = req.params.state;

    db.states.findOne({code: state}, (err, result) => {
        db.airports.find(
            {
                loc: {$geoWithin: {$geometry: result.loc}},
                type: "International"
            },
            {_id: 0, name: 1, code: 1, type: 1, loc: 1}
        ).sort(
            {name: 1},
            (err, result) => {
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(result);
                }
                return next();
            }
        );
    });

};

export default server => {

    server.get({name: 'start', path: '/'}, (req, res, next) => {
        res.send({
            message: 'GEO Coordinates Example',
            _links: {
                self: {
                    href: server.router.render('start')
                },
                airportsFromPoint: {
                    href: server.router.render('airports-point', {point: '-73.965355,40.782865'}, {km: '20'})
                },
                airportsFromCA: {
                    href: server.router.render('airports-state', {state: 'CA'})
                }
            }
        });
        return next();
    });

    server.get({name: 'airports-point', path: '/airports/@/:point'}, getAirportsFromPoint);
    server.get({name: 'airports-state', path: '/airports/:state'}, getAirportsFromState);

}
