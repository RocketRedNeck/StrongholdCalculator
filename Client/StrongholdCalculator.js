ScoreModes = new Mongo.Collection(null);

//init the arrays
var modes = [
  { name: 'Reaching a Defense', score: 0, multi: 2, type:1},
  { name: 'Crossing a Defense', score: 0, multi:10, type:1},
  { name: 'Boulder in a Low Tower Goal', score: 0 , multi:5, type:1},
  { name: 'Bouder in a High Tower Goal', score: 0, multi:10, type:1},
  { name: 'Crossing a Defense', score: 0, multi: 5, type:2},
  { name: 'Boulder in a low Tower Goal', score: 0, multi:2, type:2},
  { name: 'Boulder in a High Tower Goal', score: 0 , multi:5, type:2},
  { name: 'Challenging the Tower', score: 0, multi: 5, type:3},
  { name: 'Scailing the Tower', score: 0, multi:15, type:3}
];


for (var i = 0; i < modes.length; i++) {
 ScoreModes.insert(modes[i]);
}
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('totalScore', 0);

  Template.body.helpers({
    auto: function () {
      return ScoreModes.find({type:1});
    },
    teleop: function () {
      return ScoreModes.find({type:2});
    },
    endgame: function () {
      return ScoreModes.find({type:3});
    },
    totalScore: function(){
      return "Total Score: "+Session.get('totalScore');
    }
  });

  Template.item.events({
    'click .add': function () {
      var id=this._id;
      var temp=ScoreModes.find({_id : id},{fields:{_id:0,name:0,score:0}}).fetch();

      Session.set('totalScore', Session.get('totalScore') + temp[0].multi);

      ScoreModes.update(this._id,{$inc: {score: 1} })
    },
    'click .sub': function () {
      var id=this._id;
      var temp=ScoreModes.find({_id : id},{fields:{_id:0,name:0}}).fetch();
      if (temp[0].score>0) {
          Session.set('totalScore', Session.get('totalScore') - temp[0].multi);
            ScoreModes.update(this._id,{$inc: {score: -1} })
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
