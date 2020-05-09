'use strict';

var state = {
  grid: _.map(_.range(0, 9), function (index) {
    return { index: index, figure: -1 };
  }),
  myTurn: false
};

var appState = _.cloneDeep(state);

var block = Vue.component('block', {
  name: 'block',

  template: '#block',

  props: {
    figure: {
      type: Number,
      default: -1
    }
  },

  computed: {
    fig: function fig() {
      return this.figure === 0 ? 'O' : 'X';
    }
  },

  data: function data() {
    return {
      selected: false
    };
  },

  methods: {
    enter: function enter(el, done) {
      TweenMax.from(el, 1, {
        autoAlpha: 0,
        scale: 0,
        ease: Elastic.easeOut.config(1.25, 0.5),
        onComplete: done
      });
    }
  }
});

var win = Vue.component('win', {
  name: 'win',
  template: '#win',
  props: {
    clickHandler: {
      type: Function,
      default: null
    }
  }
});

var app = new Vue({
  name: 'app',

  el: '#app',

  data: function data() {
    return state;
  },

  components: {
    block: block
  },

  computed: {
    winner: function winner() {
      var wins = ['012', '036', '345', '147', '258', '678', '048', '246'];
      var grid = this.grid;
      var player = this.myTurn ? 0 : 1;
      var moves = _.reduce(this.grid, function (result, value, index) {
        if (value.figure === player) {
          result.push(index);
        }

        return result;
      }, []);

      return !!_.find(wins, function (win) {
        var combination = _.map(win.split(''), function (n) {
          return parseInt(n);
        });
        console.log('combination', combination, moves);

        return _.difference(combination, moves).length === 0;
      });
    }
  },

  methods: {
    select: function select(index) {
      var figure = this.grid[index].figure;

      if (figure > -1) {
        return;
      }

      this.grid[index].figure = this.myTurn ? 1 : 0;
      this.myTurn = !this.myTurn;
    },
    restart: function restart() {
      this.grid = appState.grid;
      this.myTurn = appState.myTurn;
    },
    enter: function enter(el, done) {
      TweenMax.from(el, 1, {
        autoAlpha: 0,
        scale: 0,
        ease: Elastic.easeOut.config(1.25, 0.5)
      });
    },
    enterWin: function enterWin(el) {
      TweenMax.from(el, 1, {
        autoAlpha: 0,
        scale: 0,
        ease: Elastic.easeOut.config(1.25, 0.5)
      });
    }
  }
});