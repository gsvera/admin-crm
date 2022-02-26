<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\ApiHelpers;

class CompanyController extends Controller
{
    public function newCompany()
    {
        try{
            $data = [
                'name_company' => request('name_company'),
                'number_user' => request('number_users'),
                'rfc' => request('rfc'),
                'id_user_admin' => request('id_user_admin'),
                'active' => request('active')
            ];
            
            $newCompany = ApiHelpers::httpRequest('post','company/new-company', $data);
    
            return response()->json($newCompany);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getCompanys()
    {
        try{
            $getCompanys = ApiHelpers::httpRequest('get', 'company/get-companys');

            return response()->json($getCompanys);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public  function deleteCompany()
    {
        try{
            $data = [
                'id_company' => request('id_company')
            ];

            $deleteCompany = ApiHelpers::httpRequest('post', 'company/delete-company', $data);

            return response()->json($deleteCompany);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public function updateCompany()
    {
        try{
            $data = [
                'id_company' => request('id_company'),
                'name_company' => request('name_company'),
                'number_user' => request('number_users'),
                'rfc' => request('rfc'),
                'id_user_admin' => request('id_user_admin'),
                'active' => request('active')
            ];

            $updateComp = ApiHelpers::httpRequest('post', 'company/update-company', $data);

            return response()->json($updateComp);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
}
