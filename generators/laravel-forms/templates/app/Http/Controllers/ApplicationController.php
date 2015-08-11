<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Input;
use Response;

use App\Application;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    public function getIndex()
    {
        $data = [];

        return view('index', $data);
    }

    public function getForm()
    {
        $data = [];

        return view('form', $data);
    }

    public function postFinish()
    {
        $data = [];
        $input = Input::all();

        $application = new Application;
        $application->fill($input);

        if( $application->save() ) {

            return view('finish', $data);

        } else {

            // do stuff if wrong
            return redirect('/form')->withInput();

        }

    }

    public function ajaxForm(Request $request)
    {
        if($request->ajax()) {
            $input = Input::all();

            $application = new Application;
            $application->fill($input);

            if( $application->save() ) {

                $data = [
                  'insert_id' => $application->id,
                  'success' => true
                ];

            } else {

                $data = [
                  'success' => false
                ];

            }

            return Response::json($data);

        } else {
          abort(403, 'Method not allowed.');
        }
    }
}
