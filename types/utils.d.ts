declare module '../css/*.css' {
	interface UtilsCss {

		//user-select: none;
		unselectable: string;

		//font-size: 2rem;
		h1: string;

		//font-size: 1.5rem;
		h2: string;

		//font-size: 1.25rem;
		h3: string;

		//font-size: 1rem;
		h4: string;

		//font-size: .875rem;
		h5: string;

		//font-size: .75rem;
		h6: string;

		//box-shadow: 0 2px 8px rgba(0,0,0,.09);
		s1: string;

		//box-shadow: 0 2px 8px rgba(0,0,0,.18);
		s2: string;

		//box-shadow: 0 2px 8px rgba(0,0,0,.27);
		s3: string;

		//box-shadow: 0 2px 8px rgba(0,0,0,.36);
		s4: string;

		//box-shadow: 0 2px 8px rgba(0,0,0,.45);
		s5: string;

		//font-weight: bold;
		bold: string;

		//font-weight: 900;
		bolder: string;

		//font-weight: normal;
		regular: string;

		//text-style: italic;
		italic: string;

		//text-transform: uppercase;
		caps: string;

		//text-decoration: inderline;
		underline: string;

		//text-align: left;
		leftAlign: string;

		//text-align: center;
		center: string;

		//text-align: right;
		rightAlign: string;

		//text-align: justify;
		justify: string;

		//opacity: .5;
		disabled: string;

		//opacity: .7;
		muted: string;

		/*
			color: rgba(0, 0, 0, 0.4);
			background-color: #f5f5f5;
			border-color: #d9d9d9;
			box-shadow: none;
			pointer-events: none;
		*/
		block: string;

		//border-radius: 3px;
		rounded: string;

		//border-radius: 50px;
		pill: string;

		//border-radius: 50%;
		circle: string;

		//border-radius: 3px 3px 0px 0px;
		roundedTop: string;

		//border-radius: 0px 3px 3px 0px;
		roundedRight: string;

		//border-radius: 0px 0px 3px 3px;
		roundedBottom: string;

		//border-radius: 3px 0px 0px 3px;
		roundedLeft: string;

		//pointer-events: none;
		nopointer: string;

		// cursor: pointer;
		pointer: string;

		/*
			border-top-style: dashed;
			border-left-style: dashed;
			border-right-style: dashed;
			border-bottom-style: dashed;
		*/
		borderDashed: string;

		/*
			border-style: solid;
			border-width: 1px;
			border-color: #d9d9d9;
		*/
		border: string;

		/*
			border-left-width: 0px;
			border-right-width: 0px;
			border-bottom-width: 0px;

			border-top-style: solid;
			border-top-width: 1px;
			border-top-color: rgba(0,0,0,.125);
		*/
		borderTop: string;

		/*
			border-top-width: 0px;
			border-left-width: 0px;
			border-bottom-width: 0px;

			border-right-style: solid;
			border-right-width: 1px;
			border-right-color: rgba(0,0,0,.125);
		*/
		borderRight: string;

		/*
			border-top-width: 0;
			border-left-width: 0;
			border-right-width: 0;

			border-bottom-style: solid;
			border-bottom-width: 1px;
			border-bottom-color: rgba(0, 0, 0, .125);
		*/
		borderBottom: string;

		/*
			border-top-width: 0;
			border-right-width: 0;
			border-bottom-width: 0;

			border-left-style: solid;
			border-left-width: 1px;
			border-left-color: rgba(0, 0, 0, .125);
		*/
		borderLeft: string;

		//border: none;
		borderNone: string;

		//border: 0px;
		border0: string;

		//float: left;
		left: string;

		//float: right;
		right: string;

		//margin: 0px;
		m0: string;

		//margin-top: 0px;
		mt0: string;

		//margin-right: 0px;
		mr0: string;

		//margin-bottom: 0px;
		mb0: string;

		//margin-left: 0px;
		ml0: string;

		/*
			margin-top: .5rem;
			margin-bottom: .5rem;
		*/
		my1: string;

		/*
			margin-left: .5rem;
			margin-right: .5rem;
		*/
		mx1: string;

		/*
			margin-top: 1rem;
			margin-bottom: 1rem;
		*/
		my2: string;

		/*
			margin-left: 1rem;
			margin-right: 1rem;
		*/
		mx2: string;

		/*
			margin-top: .5rem;
			margin-bottom: .5rem;
		*/
		my3: string;

		/*
			margin-top: 2rem;
			margin-bottom: 2rem;
		*/
		mx3: string;

		/*
			margin-left: 2rem;
			margin-right: 2rem;
		*/
		my4: string;

		/*
			margin-left: 4rem;
			margin-right: 4rem;
		*/
		mx4: string;

		//margin: .5rem;
		m1: string;

		//margin-top: .5rem;
		mt1: string;

		//margin-right: .5rem;
		mr1: string;

		//margin-bottom: .5rem;
		mb1: string;

		//margin-left: .5rem;
		ml1: string;

		//margin: 1rem;
		m2: string;

		//margin-left: 1rem;
		mt2: string;

		//margin-right: 1rem;
		mr2: string;

		//margin-bottom: 1rem;
		mb2: string;

		//margin-left: 1rem;
		ml2: string;

		//margin: 2rem;
		m3: string;

		//margin-top: 2rem;
		mt3: string;

		//margin-right: 2rem;
		mr3: string;

		//margin-bottom: 2rem;
		mb3: string;

		//margin-left: 2rem;
		ml3: string;

		//margin: 4rem;
		m4: string;

		//margin-top: 4rem;
		mt4: string;

		//margin-right: 4rem;
		mr4: string;

		//margin-bottom: 4rem;
		mb4: string;

		//margin-left: 4rem;
		ml4: string;

		//margin-top: -0.5rem;
		mtn1: string;

		//margin-top: -1rem;
		mtn2: string;

		//margin-top: -2rem;
		mtn3: string;

		//margin-top: -4rem;
		mtn4: string;

		//margin-right: -0.5rem;
		mrn1: string;

		//margin-right: -1rem;
		mrn2: string;

		//margin-right: -2rem;
		mrn3: string;

		//margin-right: -4rem;
		mrn4: string;

		//margin-left: -0.5rem;
		mln1: string;

		//margin-left: -1rem;
		mln2: string;

		//margin-left: -2rem;
		mln3: string;

		//margin-left: -4rem;
		mln4: string;

		//margin-bottom: -0.5rem;
		mbn1: string;

		//margin-bottom: -1rem;
		mbn2: string;

		//margin-bottom: -2rem;
		mbn3: string;

		//margin-bottom: -4rem;
		mbn4: string;

		/*
			margin-left: auto;
			margin-right: auto;
		*/
		mxAuto: string;

		//padding: 0px;
		p0: string;

		/*
			padding-top: .5rem;
			padding-bottom: .5rem;
		*/
		py1: string;

		/*
			padding-left: .5rem;
			padding-right: .5rem;
		*/
		px1: string;

		/*
			padding-top: 1rem;
			padding-bottom: 1rem;
		*/
		py2: string;

		/*
			padding-left: 1rem;
			padding-right: 1rem
		*/
		px2: string;

		/*
			padding-top: 2rem;
			padding-bottom: 2rem;
		*/
		py3: string;

		/*
			padding-left: 2rem;
			padding-right: 2rem;
		*/
		px3: string;

		/*
			padding-top: 4rem;
			padding-bottom: 4rem;
		*/
		py4: string;

		/*
			padding-left: 4rem;
			padding-right: 4rem;
		*/
		px4: string;

		//padding: 0px;
		pt0: string;

		//padding: 0px;
		pr0: string;

		//padding: 0px;
		pb0: string;

		//padding: 0px;
		pl0: string;

		//padding: .5rem;
		p1: string;

		//padding-top: .5rem;
		pt1: string;

		//padding-right: .5rem;
		pr1: string;

		//padding-bottom: .5rem;
		pb1: string;

		//padding-left: .5rem;
		pl1: string;

		//padding: 1rem;
		p2: string;

		//padding-top: 1rem;
		pt2: string;

		//padding-right: 1rem;
		pr2: string;

		//padding-bottom: 1rem;
		pb2: string;

		//padding-left: 1rem;
		pl2: string;

		//padding: 2rem;
		p3: string;

		//padding-top: 2rem;
		pt3: string;

		//padding-right: 2rem;
		pr3: string;

		//padding-bottom: 2rem;
		pb3: string;

		//padding-left: 2rem;
		pl3: string;

		//padding: 4rem;
		p4: string;

		//padding-top: 4rem;
		pt4: string;

		//padding-right: 4rem;
		pr4: string;

		//padding-bottom: 4rem;
		pb4: string;

		//padding-left: 4rem;
		pl4: string;

		//position: relative;
		relative: string;

		//position: absolute;
		absolute: string;

		//position: fixed;
		fixed: string;

		//top: 0px;
		top0: string;

		//right: 0px;
		right0: string;

		//bottom: 0px;
		bottom0: string;

		//left: 0px;
		left0: string;

		//z-index: 1;
		z1: string;

		//z-index: 2;
		z2: string;

		//z-index: 3;
		z3: string;

		//z-index: 4;
		z4: string;

		//width: 10%;
		w1: string;

		//width: 20%;
		w2: string;

		//width: 30%;
		w3: string;

		//width: 40%;
		w4: string;

		//width: 50%;
		w5: string;

		//width: 60%;
		w6: string;

		//width: 70%;
		w7: string;

		//width: 80%;
		w8: string;

		//width: 90%;
		w9: string;

		//width: 100%;
		w10: string;

		//height: 10%;
		he1: string;

		//height: 20%;
		he2: string;

		//height: 30%;
		he3: string;

		//height: 40%;
		he4: string;

		//height: 50%;
		he5: string;

		//height: 60%;
		he6: string;

		//height: 70%;
		he7: string;

		//height: 80%;
		he8: string;

		//height: 90%;
		he9: string;

		//height: 100%;
		he10: string;

		//overflow: hidden;
		overflowHidden: string;

		//overflow: scroll;
		overflowScroll: string;

		//overflow-x: scroll;
		overflowScrollX: string;

		//overflow-y: scroll;
		overflowScrollY: string;

		//overflow: auto;
		overflowAuto: string;

		/*
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		*/
		truncate: string;
	}

	const utilsCss: UtilsCss;

	export = utilsCss;
}