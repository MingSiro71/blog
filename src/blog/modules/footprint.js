// [Overview]
// Load this script from html and generate instance of Footprint
// Give this class (or, prototype)
// 1. HTMLelement of canvas
// 2. HTMLelement of scroll area
// 3. Image to draw as footprints
// Footprint detect scrollTop value of (2), generate footprint with some randomness
// and draw down in canvas
//
// [Axis and coordinate]
// posX(px) is vertical axis, increases as go down page and begin with 0
// posY(px) is horizontal axis, is 0 when it is at center
// posY is positive in the right side of page and negative in the left
// rotation(deg.) is direction of foot print and positive if rotate to the left
// rotation is in range of -30 to 30
//
// [Client Load]
// This draws footprints which should be drawn in screen (or, near the edge)
// but note that footprint object increases in stack as much as scroll

export default class Footprint {
  constructor (canvas, contentArea=document.body) {
    if (!canvas) {
      console.warn('No canvas to render footprint is defined.');
      return false;
    } else if (canvas.tagName.toUpperCase()!=='CANVAS') {
      console.warn('Variable which named "canvas" seems not to be canvas.');
      return false;
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.contentArea = contentArea;
    this.footImage = new Image();
    this.footImage.src = "/image/footprint.png";
    contentArea.addEventListener('scroll', this.reload.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));

    const firstFootPrint = {
      posX: 0,
      posY: Math.round(Math.random() * canvas.width) - (canvas.width / 2),
      rotate: Math.round(Math.random() * 60) - 30,
      leg: 'right',
    }
    this.footprints = [firstFootPrint];
    this.walker.state = {
      move: "run",
      liftedLeg: this.logics.counterLeg(firstFootPrint.leg),
      posX: firstFootPrint.posX,
      posY: firstFootPrint.posY,
      rotate: firstFootPrint.rotate,
      lastMoveScrollTop: 0
    }
  }
  walker = {
    state: {},
    props: {
      walkStride: 75,
      runStride: 150,
      footMargin: 60,
      footExtrophy: 7,
    },
    act: {
      stop: () => {
        console.count("Walker is stopping");
        if (this.walker.state.move==='stop') {
          return true;
        }
        const footprint = {
          posX: this.walker.state.posX,
          posY: this.walker.state.posY,
          rotate: this.walker.state.rotate,
          leg: this.walker.state.liftedLeg,
        }
        this.footprints.push(footprint);
        this.walker.state.move = 'stop';
        this.walker.state.liftedLeg = false;
      },
      walk: () => {
        console.count("Walker is walking");
        const footprint = {
          posX: this.walker.state.posX + this.walker.props.walkStride,
          posY: this.walker.state.posY + this.walker.props.walkStride * Math.sin(this.walker.state.rotate / 180 * Math.PI),
          rotate: this.walker.changeRotation(),
          leg: this.walker.state.liftedLeg || this.logics.randomLeg(),
        }
        this.footprints.push(footprint);
        this.walker.state.move = 'walk';
        this.walker.state.posX = footprint.posX;
        this.walker.state.posY = footprint.posY;
        this.walker.state.rotate = footprint.rotate;
        this.walker.state.liftedLeg = this.logics.counterLeg(footprint.leg);
      },
      run: () => {
        console.count("Walker is running");
        const footprint = {
          posX: this.walker.state.posX + this.walker.props.runStride,
          posY: this.walker.state.posY + this.walker.props.runStride * Math.sin(this.walker.state.rotate / 180 * Math.PI),
          rotate: this.walker.changeRotation(),
          leg: this.walker.state.liftedLeg || this.logics.randomLeg(),
        }
        this.footprints.push(footprint);
        this.walker.state.move = 'run';
        this.walker.state.posX = footprint.posX;
        this.walker.state.posY = footprint.posY;
        this.walker.state.rotate = footprint.rotate
        this.walker.state.liftedLeg = this.logics.counterLeg(footprint.leg);
      }
    },
    changeRotation: () => {
      const distributionWalkerDirection = Math.sqrt(Math.random() * 15*15) * this.logics.randomSign();
      const distributionRouteDirection = Math.sqrt(Math.random() * 30*30) * this.logics.randomSign();
      const willingRotate = () => {
        if (this.walker.state.posY < -1 * this.canvas.width / 2 ) {
          return this.walker.state.rotate + 15;
        } else if (this.walker.state.posY > this.canvas.width / 2 ) {
          return this.walker.state.rotate - 15;
        } else if (distributionRouteDirection > this.walker.state.rotate + 15) {
          return this.walker.state.rotate + 15;
        } else if (distributionRouteDirection < this.walker.state.rotate -15 ) {
          return this.walker.state.rotate - 15;
        } else {
          return distributionRouteDirection;
        }
      }
      const wismsicialRotate = (this.walker.state.rotate + distributionWalkerDirection);
      return (wismsicialRotate + willingRotate()) / 2;
    }
  }
  logics = {
    counterLeg: (leg) => {
      return leg==='right' ? 'left' : 'right';
    },
    radianLeg: (degree) => {
      return degree / 180 * -1 * Math.PI;
    },
    randomSign: () => {
      if (Math.random() < 0.5){
        return -1;
      } else {
        return 1;
      }
    },
    randomLeg: () => {
      if (Math.random() < 0.5){
        return 'right';
      } else {
        return 'left';
      }
    },
    movePerScroll: () => {
      return (this.walker.props.walkStride * 4 + this.walker.props.runStride) / 5;
    },
    noRunBuffer: () => {
      return this.walker.props.runStride;
    }
  }
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  display(scrollTop) {
    this.clearCanvas();
    this.footprints.map((footprint)=>{
      const posX = footprint.posX - scrollTop;
      const posY = footprint.posY + (this.canvas.width / 2);
      const rotation = footprint.rotate;
      const leg = footprint.leg;
      if (posX < -100) {
        return false;
      }
      this.context.save();
      if (leg==='right'){
        this.context.translate(
          posY - Math.cos(this.logics.radianLeg(rotation)) * this.walker.props.footMargin,
          posX + Math.sin(this.logics.radianLeg(rotation)) * this.walker.props.footMargin,
        );
        this.context.rotate(this.logics.radianLeg(rotation - this.walker.props.footExtrophy));
      } else if (leg==='left') {
        this.context.translate(
          posY + Math.cos(this.logics.radianLeg(rotation)) * this.walker.props.footMargin,
          posX - Math.sin(this.logics.radianLeg(rotation)) * this.walker.props.footMargin,
        );
        this.context.rotate(this.logics.radianLeg(rotation + this.walker.props.footExtrophy));
      } else { return false }
      this.context.drawImage(this.footImage, 0, 0, 60, 50);
      this.context.restore();
    });
  }
  reload(e) {
    const scrollTop = contentArea.scrollTop;
    // Check if Hen is ready for next move
    if (scrollTop - this.walker.state.lastMoveScrollTop < this.logics.movePerScroll()) {
      this.display(scrollTop);
      return true;
    }
    // Hen goes faster than window bottom
    if (this.walker.state.posX > scrollTop + this.canvas.height) {
      this.walker.act.stop();
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // Hen is behind window top
    else if (this.walker.state.posX < scrollTop) {
      this.walker.act.run();
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // Hen is running and far enough from window bottom
    else if (this.walker.state.move === 'run' && this.walker.state.posY <= scrollTop + this.canvas.height - this.logics.noRunBuffer()) {
      const random = Math.random();
      if (random < 0.8) {
        this.walker.act.run();
      } else if (random < 0.95) {
        this.walker.act.walk();
      } else {
        this.walker.act.stop();
      }
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // Hen is running and comming to the window bottom
    else if (this.walker.state.move === 'run' && this.walker.state.posY > scrollTop + this.canvas.height - this.logics.noRunBuffer()) {
      const random = Math.random();
      if (random < 0.95) {
        this.walker.act.walk();
      } else {
        this.walker.act.stop();
      }
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // Hen is walking in the window
    else if (this.walker.state.move === 'walk') {
      const random = Math.random();
      if (random < 0.4) {
        this.walker.act.run();
      } else if (random < 0.95) {
        this.walker.act.walk();
      } else {
        this.walker.act.stop();
      }
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // Hen is stopping in the window
    else if (this.walker.state.move === 'stop') {
      const random = Math.random();
      if (random < 0.3) {
        this.walker.act.walk();
      } else {
        this.walker.act.stop();
      }
      this.walker.state.lastMoveScrollTop = scrollTop;
    }
    // console.debug('move:', this.walker.state.move);
    this.display(scrollTop);
    return true;
  }
  onResize(e) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    const scrollTop = contentArea.scrollTop;
    this.display(scrollTop);
  }
}
