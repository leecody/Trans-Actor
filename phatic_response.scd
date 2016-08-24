s.boot;

SynthDef( \squarewave, { | amp = 0.0, freq = 440, trig = 0 |
    var env, sig, filt;
    sig =  LFPulse.ar( [ freq, freq * 0.999 ], 0.0, amp ) ;

	filt = BPF.ar(sig, 1000, amp);
    env = EnvGen.kr( Env.asr( 0.001, 0.9, 0.001 ), trig, doneAction: 0 );
    Out.ar( [ 0, 1 ], filt * env );
}).add;


x = Synth( \squarewave, [ \freq, 400, \amp, 0.6]);



t = Routine { arg val;
	val[1].postln;
	forBy( 2, val[1]*2, 2, { arg i;
		val[i+1] = val[i+1] * (0.01);
		val[i+1].postln;

		x.set(\freq, val[i]);
		x.set(\trig, 1);
		val[i+1].wait;
		x.set(\trig, 0);
		0.02.wait;
	});
};



f = { |msg, time, addr|
    if(msg[0] != '/status.reply') {
        "message: %\n".postf(msg);

		case
		{msg[0] == '/playtone'} {


			t.reset;
			t.value( msg );
			t.play;


		}
    }
};
thisProcess.addOSCRecvFunc(f);


s.prepareForRecord;
s.record;

s.stopRecording;


s.quit;
