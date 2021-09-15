unit Unit10;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMX.StdCtrls,
  FMX.Objects, FMX.Controls.Presentation;

type
  TForm10 = class(TForm)
    Label1: TLabel;
    Label2: TLabel;
    tb1: TTrackBar;
    Image1: TImage;
    Image2: TImage;
    Label3: TLabel;
    CornerButton1: TCornerButton;
    CornerButton2: TCornerButton;
    StyleBook1: TStyleBook;
    Button1: TButton;
    procedure CornerButton2Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Image1Click(Sender: TObject);
    procedure Image2Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form10: TForm10;
  m:double;
  v:integer;

implementation

{$R *.fmx}

uses Unit9;

procedure TForm10.CornerButton2Click(Sender: TObject);
begin
  ShowMessage(Form9.qryREALIZACJA.AsString);
  ModalResult:=mrYes;
end;

procedure TForm10.FormCreate(Sender: TObject);
begin
  Form9.qry.Close;
  Form9.qry.open;
  Label1.Text:=Form9.qryARTYKUL_KOD.Value +' - '+ Form9.qryARTYKUL_OPIS.Value;
  Label2.Text:=Form9.qryREALIZACJA.Value;
  m:=Form9.qryILOSC_MAX.Value;
  tb1.Max:=m;
  Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
end;

procedure TForm10.Image1Click(Sender: TObject);
begin
if tb1.value<>m then
  begin
    tb1.value:=tb1.value+1;
    v:=tb1.Value.ToString.ToInteger;
    Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
  end;

end;

procedure TForm10.Image2Click(Sender: TObject);
begin
if tb1.value<>0 then
  begin
    tb1.value:=tb1.value-1;
    v:=tb1.Value.ToString.ToInteger;
    Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
  end;
end;

end.
