class Piece {
    
    constructor(){

    }

    initMasterChannel(){

        this.globalNow = 0;

        this.gain = audioCtx.createGain();
        this.gain.gain.value = 3;
    
        this.fadeFilter = new FilterFade(0);
    
        this.masterGain = audioCtx.createGain();
        this.masterGain.connect(this.gain);
        this.gain.connect(this.fadeFilter.input);
        this.fadeFilter.connect(audioCtx.destination);

    }

    initFXChannels(){

        // REVERB

        this.c = new MyConvolver();
        this.cB = new MyBuffer2( 2 , 2 , audioCtx.sampleRate );
        this.cB.noise().add( 0 );
        this.cB.noise().add( 1 );

        this.c.setBuffer( this.cB.buffer );

        this.c.output.gain.value = 4;

        this.cD = new Effect();
        this.cD.randomEcho();
        this.cD.on();
        this.cD.output.gain.value = 0.125;

        // DELAY

        this.d1 = new Effect();
        this.d1.randomEcho();
        this.d1.on();
        this.d1.output.gain.value = 0.25;

        this.d2 = new Effect();
        this.d2.randomEcho();
        this.d2.on();
        this.d2.output.gain.value = 0.25;

        this.d3 = new Effect();
        this.d3.randomEcho();
        this.d3.on();
        this.d3.output.gain.value = 0.25;

        // DELAY MODULATION

        this.dB1L = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB1L.unipolarNoise( 0 ).fill( 0 );
        this.dB1L.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB1L.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB1L.loop = true;
        this.dB1L.start();

        this.dB1R = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB1R.unipolarNoise( 0 ).fill( 0 );
        this.dB1R.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB1R.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB1R.loop = true;
        this.dB1R.start();

        this.dB2L = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB2L.unipolarNoise( 0 ).fill( 0 );
        this.dB2L.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB2L.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB2L.loop = true;
        this.dB2L.start();
            
        this.dB2R = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB2R.unipolarNoise( 0 ).fill( 0 );
        this.dB2R.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB2R.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB2R.loop = true;
        this.dB2R.start();

        this.dB3L = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB3L.unipolarNoise( 0 ).fill( 0 );
        this.dB3L.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB3L.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB3L.loop = true;
        this.dB3L.start();

        this.dB3R = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.dB3R.unipolarNoise( 0 ).fill( 0 );
        this.dB3R.constant( randomFloat( 0.02 , 0.03 ) ).multiply( 0 );
        this.dB3R.playbackRate = randomFloat( 0.00002125 , 0.00003125 );
        this.dB3R.loop = true;
        this.dB3R.start();

        this.dB1L.connect( this.d1.dly.delayL.delayTime );
        this.dB1R.connect( this.d1.dly.delayR.delayTime );

        this.dB3L.connect( this.d3.dly.delayL.delayTime );
        this.dB3R.connect( this.d3.dly.delayR.delayTime );

        this.dB2L.connect( this.d2.dly.delayL.delayTime );
        this.dB2R.connect( this.d2.dly.delayR.delayTime );

        // TEST

        this.s = new SemiOpenPipe( randomInt( 700 , 2000 ) );
        this.s.output.gain.value = 0.25;

        this.s2 = new SemiOpenPipe( randomInt( 700 , 2000 ) );
        this.s2.output.gain.value = 0.25;

        this.s3 = new SemiOpenPipe( randomInt( 700 , 2000 ) );
        this.s3.output.gain.value = 0.25;

        // CONNECTIONS

        this.d1.connect( this.masterGain );
        this.d2.connect( this.masterGain );
        this.d3.connect( this.masterGain );
        
        this.c.connect( this.cD );

        this.c.connect( this.masterGain );
        this.cD.connect( this.masterGain );

        this.c.connect( this.s );
        this.c.connect( this.s2 );
        this.c.connect( this.s3 );

        this.s.connect( this.d1 );
        this.s.connect( this.d2 );
        this.s.connect( this.d3 );
        this.s.connect( this.cD );

        this.s2.connect( this.d1 );
        this.s2.connect( this.d2 );
        this.s2.connect( this.d3 );
        this.s2.connect( this.cD );

        this.s3.connect( this.d1 );
        this.s3.connect( this.d2 );
        this.s3.connect( this.d3 );
        this.s3.connect( this.cD );

    }

    load() {

        this.loadSequenceBuffer();

    }

    start(){

        this.fadeFilter.start(1, 50);
		this.globalNow = audioCtx.currentTime;

        const structureIndex = 2;

        switch( structureIndex ){
            case 0: 
                this.structure1();
                break;
            case 1: 
                this.structure2();
                break;
            case 2: 
                this.structure3();
                break;
            case 3: 
                this.structure4();
                break;
        }

    }

    structure1(){

        this.sB1.play( 0  / this.rate , 16 / this.rate );
        this.sB2.play( 4  / this.rate , 16 / this.rate );
        this.sB3.play( 8  / this.rate , 16 / this.rate );
        this.sB4.play( 12 / this.rate , 16 / this.rate );

        this.sB5.play( ( 16 + 0  ) / this.rate  , ( 16 + 20 ) / this.rate );
        this.sB6.play( ( 16 + 4  ) / this.rate  , ( 16 + 20 ) / this.rate );
        this.sB7.play( ( 16 + 8  ) / this.rate  , ( 16 + 20 ) / this.rate );
        this.sB8.play( ( 16 + 12 ) / this.rate  , ( 16 + 20 ) / this.rate );

    }

    structure2(){

        // 1
        this.sB1.play( 0  / this.rate , 8 / this.rate );

        this.sB2.play( 4  / this.rate , 16 / this.rate );

        this.sB5.play( 8  / this.rate , 16 / this.rate );
        this.sB3.play( 8  / this.rate , 16 / this.rate );

        this.sB4.play( 12 / this.rate , 16 / this.rate );

        // 2
        this.sB6.play( ( 16 + 0 ) / this.rate , ( 16 + 20 ) / this.rate );
        this.sB7.play( ( 16 + 4 ) / this.rate , ( 16 + 20 ) / this.rate );
        this.sB8.play( ( 16 + 8 ) / this.rate , ( 16 + 20 ) / this.rate );

    }

    structure3(){

        // 1
        this.sB1.play( 0  / this.rate , 8 / this.rate );
        this.sB2.play( 4  / this.rate , 8 / this.rate );

        // 2
        this.sB5.play( 8  / this.rate , 16 / this.rate );
        this.sB6.play( 8  / this.rate , 16 / this.rate );

        // 3
        this.sB3.play( 12 / this.rate , 20 / this.rate );
        this.sB7.play( 16 / this.rate , 20 / this.rate );

        this.sB5.play( 16 / this.rate ,  20 / this.rate );
        this.sB2.play( 16 / this.rate ,  20 / this.rate );

        // 4
        this.sB1.play( 20 / this.rate , 24 / this.rate );

        this.sB6.play( 20 / this.rate , 28 / this.rate );

        this.sB2.play( 24 / this.rate , 28 / this.rate );
        this.sB3.play( 24 / this.rate , 28 / this.rate );

        console.log( `piece length: ${28 / this.rate} ` );

    }

    structure4(){

        // 1
        this.sB1.play( 0  / this.rate , 1 / this.rate );
        this.sB2.play( 1  / this.rate , 2 / this.rate );

        // 2
        this.sB5.play( 2  / this.rate , 3 / this.rate );
        this.sB6.play( 3  / this.rate , 6 / this.rate );

        // 3
        this.sB3.play( 4 / this.rate , 5 / this.rate );
        this.sB7.play( 5 / this.rate , 6 / this.rate );

        this.sB5.play( 6 / this.rate ,  7 / this.rate );
        this.sB2.play( 7 / this.rate ,  8 / this.rate );

        // 4

        this.sB1.play( 8 / this.rate , 9 / this.rate );

        this.sB6.play( 9 / this.rate , 10 / this.rate );

        this.sB2.play( 10 / this.rate , 12 / this.rate );
        this.sB3.play( 11 / this.rate , 12 / this.rate );

        console.log( `piece length: ${ 12 / this.rate }` );

    }


    stop() {

        this.fadeFilter.start(0, 20);
        startButton.innerHTML = "reset";

    }

    loadSequenceBuffer(){

        this.sB1 = new SequenceBuffer( this );
        this.sB2 = new SequenceBuffer( this );
        this.sB3 = new SequenceBuffer( this );
        this.sB4 = new SequenceBuffer( this );
        
        this.sB5 = new SequenceBuffer( this );
        this.sB6 = new SequenceBuffer( this );
        this.sB7 = new SequenceBuffer( this );
        this.sB8 = new SequenceBuffer( this );

        // fund: 795.2770278384913 , rate: 0.1574199080097405
        
        const divMult = randomInt( 2 , 5 );
        this.fund = randomFloat( 325 , 400 ) * divMult;
        this.rate = randomFloat( 0.25 , 0.35 ) / divMult;
        const nHarmonics = 1;
        
        console.log( `divMult: ${divMult} , fund: ${this.fund} , rate: ${this.rate}` );
        
        // startTime , playbackRate , fund , nHarmonics , iArray , oArray , gArray , nDivs , gainVal
        this.sB1.load( this.rate , this.fund , nHarmonics , [ 1 , M2 , P4 , P5 , M6 ] , [ 1 , 2 ] , [ 0.25 , 1 ] , 10 * divMult , 0.25 );
        this.sB2.load( this.rate , this.fund , nHarmonics , [ 1 , M2 , P4 , P5 , M6 ] , [ 1 , 2 ] , [ 0.25 , 1 ] , 9 * divMult , 0.25 );
        this.sB3.load( this.rate , this.fund , nHarmonics , [ 1 , M3 ,  P5 , M6 ] , [ 4 , 1 , 2 , 8 ] , [ 0.25 , 1 ] , 11 * divMult , 0.0625 );
        this.sB4.load( this.rate * 0.5 ,  this.fund , nHarmonics , [ 1 , M3 ,  P5 , M6 ] , [ 1 , 2 , 4 ] , [ 0.25 , 1 ] , 10 * divMult , 0.5 );
        
        this.sB5.load( this.rate , this.fund , nHarmonics , [ 1 , M2 , P4 , P5 , M6 ] , [ 1 , 2 ] , [ 0.25 , 1 ] , 10 * divMult , 0.25 );
        this.sB6.load( this.rate , this.fund , nHarmonics , [ 1 , M2 , P4 , P5 , M6 ] , [ 1 , 2 ] , [ 0.25 , 1 ] , 9 * divMult , 0.25 );
        this.sB7.load( this.rate , this.fund , nHarmonics , [ 1 , M3 ,  P5 , M6 ] , [ 4 , 1 , 2 , 8 ] , [ 0.25 , 1 ] , 11 * divMult , 0.0625 );
        this.sB8.load( this.rate * 0.5 ,  this.fund , nHarmonics , [ 1 , M3 ,  P5 , M6 ] , [ 1 , 2 , 4 ] , [ 0.25 , 1 ] , 10 * divMult , 0.5 );

    }

}

class SequenceBuffer extends Piece {

    constructor( piece ){

        super();

        this.output = new MyGain ( 0 );

        this.output.connect( piece.masterGain );

        this.output.connect( piece.d1 );
        this.output.connect( piece.d2 );
        this.output.connect( piece.d3 );

        this.output.connect( piece.c );

    }

    load( playbackRate , fund , nHarmonics , iArray , oArray , gArray , nDivs , gainVal ) {

        this.output.gain.gain.value = gainVal;

        this.oB = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.oB.playbackRate = playbackRate;
        this.oB.loop = true;
        this.tB = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        this.tB2 = new MyBuffer2( 1 , 1 , audioCtx.sampleRate );
        let hPeak = 0;

        for( let i = 0 ; i < nDivs ; i++ ){

            this.tB.constant( 0 ).fill( 0 );
            this.tB2.constant( 0 ).fill( 0 );

            for( let j = 0 ; j < nHarmonics ; j++ ){

                hPeak = randomFloat( 0.1 , 0.9 );

                this.tB.sine( fund * randomArrayValue( iArray ) * randomArrayValue( oArray ) , randomFloat( gArray[0] , gArray[1] ) ).add( 0 );
                // this.tB.sine( randomFloat( 1 , 5 ) , randomFloat( 0.5 , 1 ) ).multiply( 0 );
                this.tB.ramp( i / nDivs , ( i + 1 ) / nDivs , hPeak , hPeak , randomFloat( 0.1 , 3 ) , randomFloat( 1 , 4 ) ).multiply( 0 );

                this.tB2.bufferShape( this.tB.buffer ).add( 0 );

            }

            hPeak = randomFloat( 0.1 , 0.6 );

            this.tB2.normalize( -1 , 1 );
            this.tB2.ramp( i / nDivs , ( i + 1 ) / nDivs , hPeak , hPeak , randomFloat( 0.1 , 3 ) , randomFloat( 1 , 4 ) ).multiply( 0 );

            this.oB.bufferShape( this.tB2.buffer ).add( 0 );

        }

        this.w = new Effect();
        this.w.fmShaper( fund , fund * 2 , 0.25 , 0.001 );
        this.w.on();

        this.w2 = new MyWaveShaper();
        this.w2.makeSigmoid( 1 );

        this.d = new Effect();
        this.d.randomShortDelay();
        this.d.on();
        this.d.output.gain.value = 0.5;

        this.oB.connect( this.w );

        this.w.connect( this.d );

        this.oB.connect( this.w2 );
        this.d.connect( this.w2 );

        this.w2.connect( this.output );

    }

    play( startTime , stopTime ) {

        this.oB.startAtTime( piece.globalNow + startTime );
        this.oB.stopAtTime( piece.globalNow + stopTime );

    }

}