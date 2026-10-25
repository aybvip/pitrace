# PiTrace — فهم كل معاملة

> **شرح المعاملات، موش عرضها فقط.**

PiTrace مكتبة صغيرة، **evidence-first**، تحوّل بيانات المعاملة الخام إلى شرح مفهوم. كل حقل مشروح مربوط بالحقل الذي جاء منه. البيانات الناقصة تنتج رسالة "غير متوفر" — **ماشي تخمين**.

**موش مستكشف. موش oracle. موش نصيحة مالية.**

[English](README.md) · [GitHub](https://github.com/aybvip/pitrace)

## ليش؟

مستكشفات البلوكتشين **تعرض** ما على السلسلة. نادراً ما **تشرح** ماذا يعني، ونادراً ما تقول **ما لا ننجم استنتاجه** من معاملة وحدها.

PiTrace يسدّ هذه الفجوة — بصدق.

## ماذا تفعل v0.1.0

- `normalizeTransaction(raw)` — التحقق والتوحيد إلى shape موحد
- `explainTransaction(tx)` — إنتاج شرح مربوط بالدليل
- قاموس متعدد اللغات (AR / EN)
- Test fixtures + اختبارات للبيانات الناقصة/غير المعروفة
- Zero dependencies

## ماذا لا تفعل (بالتصميم)

- لا اتصال مباشر بـ Mainnet
- لا استنتاج هوية ("من هذا الشخص؟")
- لا استنتاج غرض ("لماذا هذا الدفع؟")
- لا تخمين حالة when data missing
- لا UI، لا AI، لا تنبؤات

## بدء سريع

```bash
npm install
npm test
```

```js
import { explainTransaction } from "./src/core/explain-transaction.js";

const result = explainTransaction({
  hash: "example-transaction-hash",
  status: "success",
  amount: "12.5",
  asset: "PI",
  fee: "0.01",
  network: "testnet"
});

console.log(JSON.stringify(result, null, 2));
```

أو عبر CLI:

```bash
node bin/pitrace.js fixtures/payment.json
```

## قاعدة Evidence

> كل قيمة مشروحة يجب أن تحمل `source` يشير إلى حقل الإدخال. إذا كانت القيمة ناقصة، المخرجات تقول ذلك صراحة. PiTrace لا يخترع بيانات أبداً.

## الترخيص

MIT
