<?php

if(count($argv) < 5) die('参数不足');

$number = [$argv[1], $argv[2], $argv[3], $argv[4]];

$result = permutation(['a', 'b', 'c', 'd']);
$method = ['+', '-', '*', '/'];

$result = getExpression($result, $method);

//print_r($result);die;

$out = [];
foreach($result as $v)
{
    $str = str_replace('a', $number[0], $v);
    $str = str_replace('b', $number[1], $str);
    $str = str_replace('c', $number[2], $str);
    $str = "return " . str_replace('d', $number[3], $str) . ";";
    $result = @eval($str);
    if(round($result, 5) == 24) $out[] = substr($str, 7);
}

print_r($out);
die;

/**
 * 表达式
 * @param array $data
 * @param array $method
 * @return array
 */
function getExpression($data, $method)
{
    $count = count($data[0]);
    for($i=1; $i<$count; $i++)
    {
        $result = [];
        foreach ($data as $v)
        {
            foreach ($method as $m)
            {
                $tmp = $v;
                $temp = ["({$v[0]}{$m}{$v[1]})"];
                unset($tmp[0], $tmp[1]);
                $temp = array_merge($temp, $tmp);
                $result[] = count($temp) == 1 ? $temp[0] : $temp;
            }
        }
        $data = $result;
    }    
    return $data;
}

/**
 * 排列
 * @param $arr
 * @return array
 */
function permutation($arr)
{
    $count = count($arr);
    if($count==1)
    {
        return [$arr];
    }
    else
    {
        $result = [];
        foreach($arr as $id=>$v)
        {
            $temp = $arr;
            $now = $temp[$id];
            unset($temp[$id]);
            $result1 = permutation($temp);
            foreach($result1 as $vv)
            {
                array_unshift($vv, $now);
                $result[] = $vv;
            }
        }
        return $result;
    }
}
