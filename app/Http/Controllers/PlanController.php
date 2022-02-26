<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiHelpers;

class PlanController extends Controller
{
    public function newPlan(){
        try{
            $data= [
                'name_plan' => request('name_plan'),
                'months' => request('months'),
                'price_months' => request('price_months'),
                'price_year' => request('price_year'),
                'visible' => request('visible'),
                'number_user' => request('number_user'),
                'detailPlan' => request('detailPlan')
            ];

            $sendNewPlan = ApiHelpers::httpRequest('post', 'plan/new-plan', $data);

            return response()->json($sendNewPlan);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getPlans()
    {
        try{
            $getPlans = ApiHelpers::httpRequest('get', 'plan/get-plans');

            return response()->json($getPlans);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function updatePlan()
    {
        $data = [
            'id_plan' => request('id_plan'),
            'name_plan' => request('name_plan'),
            'months' => request('months'),
            'price_months' => request('price_months'),
            'price_year' => request('price_year'),
            'visible' => request('visible'),
            'number_user' => request('number_user'),
            'detailPlan' => request('detailPlan')
        ];

        try{
            $updatePlans = ApiHelpers::httpRequest('post', 'plan/update-plan', $data);

            return response()->json($updatePlans);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function saveSalePlan()
    {
        try{
            $data = [
                "id_company" => request('idCompany'),
                'id_plan' => request('idPlan'),
                'name_company' => request('inputCompany'),
                'time_month' => request('timeMonth'),
                'date_start' => request('dateStar'),
                'date_end' => request('dateEnd'),
                'option_pay' => request('optionPayPlan'),
                'amount' => request('amounPay'),
                'number_user' => request('numberUser'),
                'amount_extra' => request('amountExtra'),
                'total' => request('total')
            ];

            $logPlan = ApiHelpers::httpRequest('post', 'plan/save-sale-plan', $data);

            return response()->json($logPlan);

        }catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getEraserPlans()
    {
        try{
            $get = ApiHelpers::httpRequest('get', 'plan/get-eraser-plan');

            return response()->json($get);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function deleteEraserSale()
    {
        try{
            $data = [
                "id_sale" => request('id_sale')
            ];

            $delete = ApiHelpers::httpRequest('post', 'plan/delete-eraser-sale', $data);

            return response()->json($delete);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
}
