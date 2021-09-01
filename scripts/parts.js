class Piece {
    
    constructor(){

    }

    initMasterChannel(){

        this.globalNow = 0;

        this.gain = audioCtx.createGain();
        this.gain.gain.value = 1;
    
        this.fadeFilter = new FilterFade(0);
    
        this.masterGain = audioCtx.createGain();
        this.masterGain.connect(this.gain);
        this.gain.connect(this.fadeFilter.input);
        this.fadeFilter.connect(audioCtx.destination);

    }

    load() {

        this.loadOverlappingWavesFM();
        this.loadResoTick();

    }

    start(){

        this.fadeFilter.start(1, 50);
		this.globalNow = audioCtx.currentTime;

        this.startOverlappingWavesFM2();
        // this.startResoTick();

    }

    stop() {

        this.fadeFilter.start(0, 20);
        startButton.innerHTML = "reset";

    }

}

class ToneRepeat extends Piece {

    constructor( piece ){

        super();

        this.output = new MyGain ( 1 );

        this.output.connect( piece.masterGain );

    }

    load() {

        this.oB = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.oB.sine( 432 , 1 ).add( 0 );

    }

    play() {

        this.eB.startAtTime( piece.globalNow + 0 );

    }

}