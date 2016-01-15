Autonomous = new Mongo.Collection(null);
Teleop = new Mongo.Collection(null);
Endgame = new Mongo.Collection(null);
//init the arrays
var autos = [
  { name: 'Reaching a Defense', score: 0, multi: 2},
  { name: 'Crossing a Defense', score: 0, multi:10},
  { name: 'Boulder in a Low Tower Goal', score: 0 , multi:5},
  { name: 'Bouder in a High Tower Goal', score: 0, multi:10}
];
var teleop = [
  { name: 'Crossing a Defense', score: 0, multi: 5},
  { name: 'Boulder in a low Tower Goal', score: 0, multi:2},
  { name: 'Boulder in a High Tower Goal', score: 0 , multi:5}

];

var endgame = [
  { name: 'Challenging the Tower', score: 0, multi: 5},
  { name: 'Scailing the Tower', score: 0, multi:15}

];

for (var i = 0; i < autos.length; i++) {
 Autonomous.insert(autos[i]);
}
for (var i = 0; i < teleop.length; i++) {
 Teleop.insert(teleop[i]);
}
for (var i = 0; i < endgame.length; i++) {
 Autonomous.insert(endgame[i]);
}
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('totalScore', 0);

  Template.body.helpers({
    auto: function () {
      return Autonomous.find({});
    },
    totalScore: function(){
      return "Score: "+Session.get('totalScore');
    }
  });

  Template.item.events({
    'click .add': function () {
      var id=this._id;
      var temp=Autonomous.find({_id : id},{fields:{_id:0,name:0,score:0}}).fetch();

      Session.set('totalScore', Session.get('totalScore') + temp[0].multi);

      Autonomous.update(this._id,{$inc: {score: 1} })
    },
    'click .sub': function () {
      var id=this._id;
      var temp=Autonomous.find({_id : id},{fields:{_id:0,name:0}}).fetch();
      if (temp[0].score>0) {
          Session.set('totalScore', Session.get('totalScore') - temp[0].multi);
            Autonomous.update(this._id,{$inc: {score: -1} })
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
